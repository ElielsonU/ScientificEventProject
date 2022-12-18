import { GetStaticProps } from "next";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {},
    revalidate: 60
  }
}

export default function Page() {

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
      {emailExists
      ? <form onSubmit={formSubmitHandler} name="password_change_form">
          <input type="password" name="new_password" placeholder="Your new password" onChange={inputChangeHandler} minLength={8} value={newPassword} required/>
          <input type="password" name="repeat_password" placeholder="Repeat this" onChange={inputChangeHandler} required/>
          <button>Submit</button>
        </form>
      : <form onSubmit={formSubmitHandler} name="email_form">
          <input type="text" placeholder="Inform your email" name="email" value={email} onChange={inputChangeHandler} required/>
          <button>Submit</button>
        </form>}
      
    </>
  )
}