import { GetStaticProps } from "next";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import Head from "next/head";

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
      if (inputElement.name == "email") {
        !emailExists?setEmail(inputElement.value):null
        return 
      }
      if (inputElement.name == "new_password") { 
        emailExists?setNewPassword(inputElement.value):null 
      }
      if (inputElement.name == "repeat_password") {
        emailExists?null: inputElement.value = ""
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
     <title>Reset password</title>
    </Head>

    </>
  )
}