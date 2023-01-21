import { GetStaticProps } from "next";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import Head from "next/head";
import Div from "../components/Div";
import Form from "../components/Form";
import TextInput from "../components/TextInput";

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

export default function Page(props: PageProps) {

  const router = useRouter()
  const [email, setEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [emailExists, setEmailExists] = useState(false)

  const inputChangeHandler = (e: React.SyntheticEvent) => {
      const inputElement = (e.target as HTMLInputElement )
      if (inputElement.name == "email") { setEmail(inputElement.value) }
      if (inputElement.name == "new_password") { setNewPassword(inputElement.value) }
      if (inputElement.name == "repeat_password") {
        newPassword == String(inputElement.value)
        ?inputElement.setCustomValidity("")
        :inputElement.setCustomValidity("Passwords doens't match")
      }
  }

  const formSubmitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    const formElement = (e.target as HTMLFormElement)
    if (formElement.name == "email_form") {
      try {
        await axios.post("http://localhost:3000/api/useremailexists", {email})
        setEmailExists(true)
      } catch (err: any) {
        console.error(err.message)
      }
    }
    if (formElement.name == "password_change_form") {
      try {
        const res = await axios.post("http://localhost:3000/api/resetpassword",
        {email, password: newPassword})
        const token = res.data.msg
        setCookie("loggedAs", token)
        router.reload()
      } catch (err: any) {
        console.error(err.message)
      }
    }
  }

  return (
    <>
    <Head>
     <title>Reset your password</title>
    </Head>
      <Div height="100%" width="100%" backgroundImage="background2.png" alignItems="center" flexDirection="row" justifyContent="center">
        <Div height="430px" width="380px" alignItems="center" justifyContent="space-between" borderRadius="15px" boxShadow={props.color4} flexDirection="column" Id="LoginDiv" backgroundColor={props.color4}>
          <Form backgroundColor={props.color2} height="185px" width="100%" onSubmit={formSubmitHandler} name="email_form">
            <h2>Reset Your Password</h2>
            <Div alignItems="center" flexDirection="row" height="auto" justifyContent="space-between" width="auto">
              <TextInput fontSize="24px" name="email" value={email} placeholder="Email" textColor={props.color4} type="email" onChange={inputChangeHandler} required width="333px"/>
              
            </Div>
          </Form>
          <Form backgroundColor={props.color2} height="185px" width="100%" onSubmit={formSubmitHandler}>

          </Form>
        </Div>
      </Div>
    </>
  )
}