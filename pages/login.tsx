import Head from "next/head";
import { useState } from "react";
import { GetStaticProps } from "next";
import React from "react";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import Link from "next/link";

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    revalidate: 60 * 6,
    props: {},
  };
};

export default function Home() {
  const inputChangeHandler = (e: React.SyntheticEvent) => {
    const inputElement = e.target as HTMLInputElement;
    if (inputElement.name === "name") setUsername(inputElement.value);
    if (inputElement.name === "email") setEmail(inputElement.value);
    if (inputElement.name === "password") setPassword(inputElement.value);
    if (inputElement.id === "isLogin") setIsLogin(!isLogin);
    if (inputElement.name === "isAdmin")
      setIsAdmin(!!Number(inputElement.value));
  };

  const router = useRouter()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [failedAttemps, setFailedAttemps] = useState(0);

  const resTokenToCookie = (TokenCookie: string) => {
    setCookie("loggedAs", TokenCookie, {
      expires: new Date(Date.now() + 1 * 1000 * 60 * 60 * 24 * 7),
    });
  };

  type postProps = {
    username?: string;
    email: string;
    password: string;
    isAdmin?: boolean;
  };

  const authPost = async (url: string, props: postProps) => {
    try {
      const res = await axios.post(url, props);

      const TokenCookie = res.data.msg;
      resTokenToCookie(TokenCookie);
    } catch (err) {
      console.error(err);
      setFailedAttemps(failedAttemps + 1);
    }
  };

  const formSubmitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (isLogin) {
      await authPost("http://localhost:3000/api/login", {
        email: email.toLowerCase(),
        password,
      });
    } else {
      await authPost("http://localhost:3000/api/signup", {
        email: email.toLowerCase(),
        password,
        username,
        isAdmin,
      });
    }
    router.reload()
  };
  const failedAttempsController = () => {
    setTimeout(() => {
      setFailedAttemps(0);
    }, 10 * 1000);
  };

  return (
    <>
      <Head>
        <title>Welcome</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h1>Title</h1>
      </header>
      {failedAttemps % 5 == 0 && failedAttemps > 0 ? (
        <>
          <div>Credentials misinformed 5 times...</div>
          {failedAttempsController()}
        </>
      ) : (
        <fieldset>
          <legend id="isLogin" onClick={inputChangeHandler}>
            {isLogin ? "Login" : "Sign Up"}
          </legend>

          <form onSubmit={formSubmitHandler}>
            {isLogin ? null : (
              <input
                type="text"
                placeholder="Username"
                name="name"
                onChange={inputChangeHandler}
                value={username}
                required
              />
            )}
            <input
              type="email"
              placeholder="email"
              name="email"
              onChange={inputChangeHandler}
              value={email}
              required
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              onChange={inputChangeHandler}
              value={password}
              minLength={8}
              required
            />
            {isLogin ? null : (
              <>
                <label>
                  <input
                    type="radio"
                    name="isAdmin"
                    onChange={inputChangeHandler}
                    value={0}
                    required
                  />
                  Normal User
                </label>
                <label>
                  <input
                    type="radio"
                    name="isAdmin"
                    onChange={inputChangeHandler}
                    value={1}
                    required
                  />
                  Admin
                </label>
              </>
            )}
            <button type="submit">Submit</button>
            {isLogin ? <Link href="/resetpassword">I forgot my password</Link> : null}
          </form>
        </fieldset>
      )}
      <footer>
        By: Science now
      </footer>
    </>
  );
}
