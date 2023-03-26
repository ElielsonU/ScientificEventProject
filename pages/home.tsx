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

  return (
    <>
      <Head>
        <title>Homepage</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      
    </>
  );
}
