import { GetStaticProps } from "next";
import Head from "next/head";
import React from "react";

import FormCard from "../components/organisms/FormCard";

export const getStaticProps: GetStaticProps = async (context) => {
  const colors = {
    c1: "#FCF9F8",
    c2: "#2A292C",
    c3: "#2288E3",
    c4: "#99A6B4"
  }
  
  return {
    revalidate: 60 * 12,
    props: {
      colors
    },
  }
};

type colorsProps = {
  c1: string;
  c2: string;
  c3: string;
  c4: string;
}

interface PageProps {
  colors: colorsProps;
}

export default function Page(props: PageProps) {
  return (
    <>
      <Head>
        <title>Reset password</title>
      </Head>
      
      <FormCard colors={props.colors} type="resetpassword"/>

    </>
  )
}