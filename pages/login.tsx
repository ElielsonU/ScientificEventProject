import Head from "next/head";
import { useState, useEffect } from "react";
import { GetStaticProps } from "next";
import React from "react";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "../components/Header";
import Div from "../components/Div";
import Image from "next/image";
import Form from "../components/Form";
import TextInput from "../components/TextInput";
import Checkbox from "../components/Checkbox";
import Button from "../components/Button";


export const getStaticProps: GetStaticProps = async (context) => {
  const color1 = "#FCF9F8"
  const color2 = "#2A292C"
  const color3 = "#2288E3"
  const color4 = "#99A6B4"
  const border = "10px"
  
  return {
    revalidate: 60 * 6,
    props: {
      color1,
      color2,
      color3,
      color4,
      border
    },
  };
};

interface PageProps {
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  border: string;
}

export default function Home(props: PageProps) {
  const inputChangeHandler = (e: React.SyntheticEvent) => {
    const inputElement = e.target as HTMLInputElement;
    if (inputElement.name === "name") setUsername(inputElement.value);
    if (inputElement.name === "email") setEmail(inputElement.value);
    if (inputElement.name === "password") setPassword(inputElement.value);
    if (inputElement.name === "isAdmin") setIsAdmin(!!Number(inputElement.value));
  };

  const router = useRouter()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
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
    } catch (err: any) {
      console.error(err.message);
      setFailedAttemps(failedAttemps + 1);
      return
    }
    setTimeout(router.reload, 20);
  };

  const failedAttempsController = () => {
    setTimeout(() => {
      setFailedAttemps(0);
    }, 10 * 1000);
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
  };

  return (
    
    <>
      <Head>
        <title>Welcome</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <Div justifyContent="space-between" flexDirection="column" width="100%" height="100%" alignItems="center" backgroundImage="background1.png">
        <Header justifyContent="space-evenly">
          <h1>Coral Bleaching</h1>
        </Header>
      {isLogin
        ?<Div width="680px" height="430px" alignItems="center" justifyContent="flex-end" borderRadius="15px" boxShadow={props.color3} flexDirection="column" Id="LoginDiv">
          <Image alt="blueCorals" src={"/img/cardimage.png"} width={300} height={430} 
          className="FormImg" priority/>

          <Form backgroundColor={props.color2} height="430px" width="380px" onSubmit={formSubmitHandler} Id="LoginForm">
            <h2>Welcome back!</h2>

            <TextInput fontSize="24px" placeholder="Email" textColor={props.color4} value={email} type="email" width="90%" onChange={inputChangeHandler} name="email" required/>

            <Div width="90%" alignItems="center" flexDirection="row" height="53px" justifyContent="flex-start">
              <TextInput fontSize="24px" placeholder="Password" textColor={props.color4} value={password} type="password" width="100%" onChange={inputChangeHandler} name="password"/>

              <Link href={"/resetpassword"} className="link">Forgot Password</Link>
            </Div>
            <Div justifyContent="space-around" width="100%" alignItems="center" flexDirection="row" height="min-content" >
              <Button buttonType="signup" backgroundColor={props.color3} textColor={props.color1} onClick={(event) => {
                event.preventDefault()
                setIsLogin(!isLogin)
                }}>
                Sign Up
              </Button>

              <Button buttonType="login" backgroundColor={props.color2} textColor={props.color3}>
                Login
              </Button>
            </Div>

          </Form>
        </Div>
        :<Div width="680px" height="430px" alignItems="center" justifyContent="flex-end" borderRadius="15px" boxShadow={props.color3} flexDirection="column" Id="LoginDiv">
          <Image alt="blueCorals" src={"/img/cardimage.png"} width={300} height={430} 
          className="FormImg" priority/>

          <Form backgroundColor={props.color2} height="430px" width="380px" onSubmit={formSubmitHandler} Id="LoginForm">
            <h2>Join Our Event!</h2>

            <TextInput fontSize="24px" placeholder="Username" textColor={props.color4} value={username} type="text" width="90%" onChange={inputChangeHandler} name="name" required/>
            <TextInput fontSize="24px" placeholder="Email" textColor={props.color4} value={email} type="email" width="90%" onChange={inputChangeHandler} name="email" required/>
            <TextInput fontSize="24px" placeholder="Password" textColor={props.color4} value={password} type="password" width="90%" onChange={inputChangeHandler} name="password" required/>
            <Checkbox fontSize={24} textColor={props.color4} value={isAdmin?0:1} onChange={inputChangeHandler} name="isAdmin">
                Admin: 
            </Checkbox>

            <Div justifyContent="space-around" width="100%" alignItems="center" flexDirection="row" height="min-content" >
              <Button buttonType="login" backgroundColor={props.color2} textColor={props.color3} onClick={(event) => {
                event.preventDefault()
                setIsLogin(!isLogin)
                }}>
                Login
              </Button>

              <Button buttonType="signup" backgroundColor={props.color3} textColor={props.color1}>
                Sign Up
              </Button>
            </Div>
          </Form>
        </Div>}
        <footer>
          Made By: <Link href={"https://github.com/ElielsonU"}>Elielson Urbano</Link>
        </footer>
      </Div>
    </>
  );
}
