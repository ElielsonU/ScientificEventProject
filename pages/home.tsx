import { GetStaticProps } from "next";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Head from "next/head";

export const getStaticProps: GetStaticProps = async () => {
  const subRes = await axios.get("http://localhost:3000/api/getallusers");
  const subbedUsers = subRes.data.subbedUsers;

  const color1 = "#FCF9F8"
  const color2 = "#2A292C"
  const color3 = "#2288E3"
  const color4 = "#99A6B4"
  const border = "10px"

  return {
    props: {
      subbedUsers,
      color1,
      color2,
      color3,
      color4,
      border
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
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  border: string;
}

export default function Page(props: pageProps) {
  const [articleTitle, setArticleTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [username, setUsername] = useState();
  const [userID, setUserID] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [actualArticle, setActualArticle] = useState(0)
  const router = useRouter();
  const [filterArticleTitle, setFilterArticleTitle] = useState("");
  const [filterArticleOwnerID, setFilterArticleOwnerID] = useState(0);
  const [filterArticleAllowed, setfilterArticleAllowed] = useState(isAdmin?true:false);
  const [resArticles, setResArticles] = useState([{
    IdArticle: 0,
    Title: "",
    Content: "",
    User_ID: 0,
    Allowed: 0,
  }]);
  
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
    if (inputElement.name == "allowedFilter")
      setfilterArticleAllowed(!filterArticleAllowed);
    if (inputElement.name == "articleTitle")
      setArticleTitle(inputElement.value);
    if (inputElement.name == "articleContent")
      setArticleContent(inputElement.value);
    if (inputElement.name == "articleTitleFilter")
      setFilterArticleTitle(inputElement.value);
    if (inputElement.name == "idOwnerFilter")
      setFilterArticleOwnerID(Number(inputElement.value));
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

  const changeActualArticle = async (increment: number) => {
    if ((actualArticle + increment) < 0) {
      setActualArticle(resArticles.length - 1)
      return
    }
    if ((actualArticle + increment) > (resArticles.length - 1)){
      setActualArticle(0)
      return
    }

    setActualArticle(actualArticle + increment)
  }

  return (
    <>
      <Head>
        <title>Homepage</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      
    </>
  );
}
