import { GetStaticProps } from "next";
import Head from "next/head";
import React from "react";
import Link from "next/link";

import H1 from "../components/cells/H1";
import Span from "../components/cells/Span";
import Header from "../components/cells/Header";
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
}

type colorsProps = {
    c1: string;
    c2: string;
    c3: string;
    c4: string;
}

interface PageProps {
  colors: colorsProps
}

export default function Home(props: PageProps) {
  return (
    <>
      <Head>
        <title>Welcome</title>
      </Head>
      
      <Header justifyContent="space-evenly">
        <H1 color={props.colors.c1} textShadow="0px 0px 5px" fontSize="32px">
          Coral Bleaching
        </H1>
      </Header>

      <FormCard colors={props.colors} type="login"/>      
      
      <Span color={props.colors.c1}>Made By: <Link href={"https://github.com/ElielsonU"}>Elielson Urbano</Link></Span>
    </>
  );
}
