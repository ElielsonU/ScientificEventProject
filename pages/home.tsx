import { GetStaticProps } from "next";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Head from "next/head";

export const getStaticProps: GetStaticProps = async () => {
  const subRes = await axios.get("http://localhost:3000/api/getallusers");
  const subbedUsers = subRes.data.subbedUsers;

  const artRes = await axios.get("http://localhost:3000/api/getallarticles");
  const allRes = artRes.data.msg;

  return {
    props: {
      allRes,
      subbedUsers,
    },
    revalidate: 360,
  };
};

interface articlesProps {
  IdArticle: number;
  Title: string;
  Content: string;
  User_ID: number;
  Allowed: number;
}

interface pageProps {
  allRes: number;
  subbedUsers: number;
}

export default function Page(props: pageProps) {
  const router = useRouter();
  const [filterArticleTitle, setFilterArticleTitle] = useState("");
  const [filterArticleOwnerID, setFilterArticleOwnerID] = useState(0);
  const [filterArticleAllowed, setfilterArticleAllowed] = useState(false);
  const [resArticles, setResArticles] = useState([]);
  const [articleTitle, setArticleTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [username, setUsername] = useState();
  const [userID, setUserID] = useState();
  const [isAdmin, setIsAdmin] = useState();

  const getArticlesHandler = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/getarticles", {
        title: filterArticleTitle,
        IdUsers: filterArticleOwnerID,
        allowed: filterArticleAllowed,
      });
      setResArticles(res.data.articles);
    } catch (err: any) {
      console.error("Error Name: " + err.name + "\nError Message: " + err.message);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/userbytoken");
        setUsername(res.data.msg.Username);
        setUserID(res.data.msg.IdUsers);
        setIsAdmin(res.data.msg.IsAdmin);
      } catch (err: any) {
        console.error(
          "Error Name: " + err.name + "\nError Message: " + err.message
        );
      }
    })();
  }, []);

  useEffect(() => {
    getArticlesHandler();
  }, [filterArticleTitle, filterArticleOwnerID, filterArticleAllowed]);

  const inputChangeHandler = (e: React.SyntheticEvent) => {
    const inputElement = e.target as HTMLInputElement;
    if (inputElement.name == "articleTitle")
      setArticleTitle(inputElement.value);
    if (inputElement.name == "articleContent")
      setArticleContent(inputElement.value);
    if (inputElement.name == "articleTitleFilter")
      setFilterArticleTitle(inputElement.value);
    if (inputElement.name == "idOwnerFilter")
      setFilterArticleOwnerID(Number(inputElement.value));
    if (inputElement.name == "allowedFilter")
      setfilterArticleAllowed(!filterArticleAllowed);
  };

  const disconnectHandler = () => {
    deleteCookie("loggedAs");
    router.reload();
  };

  const articleSubmitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/submitarticle", {
        articleTitle,
        articleContent,
      });
      setArticleContent("");
      setArticleTitle("");
      alert(res.data.msg);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const adminActionsHandler = async (IdArticle: number, command: boolean) => {
    try {
    const res = await axios.post("http://localhost:3000/api/adminactions", {
      IdArticle,
      command
    });
    alert(res.data.msg);
    await getArticlesHandler();
    return;
  } catch (err: any) {
    console.log(err.message)
  }
  };

  return (
    <>
      <Head>
        <title>Homepage</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <a>{username}</a>
        <h1>Title</h1>
        {isAdmin ? (
          <span>
            Total of users: <var>{props.subbedUsers}</var>
          </span>
        ) : null}
        <button onClick={disconnectHandler}>Disconnect</button>
      </header>
      <form onSubmit={articleSubmitHandler}>
        <input
          type="text"
          minLength={8}
          placeholder="Article Title"
          value={articleTitle}
          name="articleTitle"
          onChange={inputChangeHandler}
          required
        />
        <textarea
          minLength={90}
          placeholder="Article Content"
          value={articleContent}
          name="articleContent"
          onChange={inputChangeHandler}
          style={{ resize: "none" }}
          cols={30}
          rows={10}
          required
        />
        <button>Submit</button>
      </form>
      <form>
        <label>
          User ID:
          <input
            type="number"
            min={0}
            value={filterArticleOwnerID}
            name="idOwnerFilter"
            onChange={inputChangeHandler}
          />
        </label>

        <input
          type="text"
          value={filterArticleTitle}
          name="articleTitleFilter"
          placeholder="Article Title Filter"
          onChange={inputChangeHandler}
        />

        {isAdmin ? (
          <label>
            only allowed
            <input
              type="checkbox"
              name="allowedFilter"
              onClick={inputChangeHandler}
            />
          </label>
        ) : null}
      </form>
      <ul>
        {isAdmin ? (
          <p>
            Total of articles: <var>{props.allRes}</var>
          </p>
        ) : null}
        {resArticles.map((article: articlesProps) => {
          return (
            <li key={article.IdArticle}>
              <h3>{article.Title}</h3>
              <p>{article.Content}</p>
              <div>
                {isAdmin ? (
                  <span>
                    Owner ID: <var>{article.User_ID}</var>
                  </span>
                ) : null}
                {!article.Allowed ? (
                  <button onClick={() => {adminActionsHandler(article.IdArticle, true);}}>
                    Accept
                  </button>
                ) : null}
                {isAdmin || userID == article.User_ID ? (
                  <button onClick={() => {adminActionsHandler(article.IdArticle, false);}}>
                    Remove
                  </button>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
