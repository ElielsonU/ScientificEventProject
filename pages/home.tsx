import { removeCookies } from "cookies-next";
import { GetServerSideProps } from "next";
import Router, { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";

import FormCard from "../components/organisms/FormCard";
import Header from "../components/cells/Header";
import Span from "../components/cells/Span";
import Div from "../components/cells/Div";

import React from "react";
import axios from "axios";

export const getServerSideProps: GetServerSideProps = async (context) => {
  
  const getUserByToken = async (req: {loggedAs?: string}) => {
    const res = await axios.post("http://localhost:3000/api/userbytoken", req)
    return res.data.msg
  }

  const getArticles = async (req: {loggedAs?: string, allowed?: boolean}) => {
    const res = await axios.post("http://localhost:3000/api/getarticles", req)
    return res.data.msg
  }

  const getUsers = async (admin: boolean) => {
    let res;
    if (admin) {
      res = await axios.get("http://localhost:3000/api/getallusers")
    }
    
    return Number(res?.data.msg)
  }

  const user = await getUserByToken({loggedAs: context.req.cookies.loggedAs})
  
  const subbedUsers = await getUsers(user.isAdmin)

  const allowed = await getArticles({loggedAs: context.req.cookies.loggedAs, allowed: true})
  const notAllowed = await getArticles({loggedAs: context.req.cookies.loggedAs})


  const colors = {
    c1: "#FCF9F8",
    c2: "#2A292C",
    c3: "#2288E3",
    c4: "#99A6B4"
  }
  
  return {
    props: {
      articles: { allowed, notAllowed },
      subbedUsers,
      colors,
      user,
    },
  }
};

interface articlesProps {
  IdArticle: number;
  Content: string;
  User_ID: number;
  Allowed: number;
  Title: string;
}

type colorsProps = {
  c1: string;
  c2: string;
  c3: string;
  c4: string;
}

type UserProps = {
  IdUsers?: number;
  Username?: string;
  IsAdmin?: boolean;
  Password: string;
  Email: string;
  Token: string;
}

interface pageProps {
  subbedUsers: number;
  articles: {
    allowed: Array<articlesProps>;
    notAllowed: Array<articlesProps>;
  };
  colors: colorsProps;
  user: UserProps;
}

export default function Page(props: pageProps) {

  const router = useRouter()

  const disconnect = () => {
    removeCookies("loggedAs")
    router.replace("/login")
  }

  return (
    <>
      <Head>
        <title>Homepage</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header >
        <Div height="60px" alignItems="flex-start" justifyContent="center" >
          <Image src={"/imgs/user-icon.png"} alt="user icon" width={60} height={60}/>
          <Div flexDirection="column" alignItems="flex-start" justifyContent="center">
            <Span color={props.colors.c1} fontSize="20px">{props.user.Username}</Span>
            <a onClick={() => {}} id="disconnect-a">Disconnect</a>
          </Div>
        </Div>
        {props.subbedUsers? <Span>{props.subbedUsers}</Span> : null}
      </Header>

      <Div justifyContent="space-evenly" width="100%" height="80%" alignItems="center">
        <FormCard colors={props.colors} type="submitarticle" user={props.user}/>
        <FormCard colors={props.colors} type="viewarticles" articles={props.articles} subbedUsers={props.subbedUsers} user={props.user}/>
      </Div>

    </>
  );
}
