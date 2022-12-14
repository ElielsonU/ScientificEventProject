import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = (context) => {
  return {
    redirect: {
      destination: "http://localhost:3000/login",
      permanent: true    
    }
  }
}

export default function Page() { return <></> }