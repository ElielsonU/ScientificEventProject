import { GetStaticProps } from "next";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import axios from "axios";
import React, { useState } from "react";
import Head from "next/head";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 360,
  };
};

export default function Page() {
  const router = useRouter();
  const [articleTitle, setArticleTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [username, setUsername] = useState();

  (async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/usernamebytoken");
      setUsername(res.data.msg);
    } catch (e: any) {
      console.error("Error Name: " + e.name + "\nError Message: " + e.message);
    }
  })();

  const inputChangeHandler = (e: React.SyntheticEvent) => {
    const inputElement = e.target as HTMLInputElement;
    if (inputElement.name == "articleTitle") setArticleTitle(inputElement.value);
    if (inputElement.name == "articleContent") setArticleContent(inputElement.value);
  };

  const disconnectHandler = () => {
    deleteCookie("loggedAs");
    router.reload();
  };

  const articleSubmitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/submitarticle",
        { articleTitle, articleContent }
        );
      console.log(res.data)
    } catch(err: any) {
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
        <a href="">{username}</a>

        <h1>Title</h1>

        <button onClick={disconnectHandler}>Disconnect</button>
      </header>
      <form onSubmit={articleSubmitHandler}>
        <input
          type="text"
          minLength={8}
          value={articleTitle}
          name="articleTitle"
          onChange={inputChangeHandler}
          required
        />
        <textarea
          minLength={90}
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
        {/*  */}
      </form>
      <ul>articles goes here</ul>
    </>
  );
}
