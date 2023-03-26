import React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Link from "next/link";
import Image from "next/image";

import H1 from "../../cells/H1"; 
import Div from "../../cells/Div";
import Form from "../../cells/Form";
import Button from "../../cells/Button";
import Checkbox from "../../cells/Checkbox";
import TextInput from "../../cells/TextInput";
import NumberInput from "../../cells/NumberInput";

import { login, signUp, checkEmail, resetPassword } from "./utils";


type colorsProps = {
    c1: string;
    c2: string;
    c3: string;
    c4: string;
}

interface FormCardProps {
    type: "login"|"resetpassword"|"submitarticle"|"viewarticles";
    isAdmin?: boolean;
    userID?: number;
    colors: colorsProps;
}

const SignUpForm:React.FC<{colors: colorsProps, changeForm: Function}> = ({
    colors,
    changeForm
}) => {
    const [email, setEmail] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const router = useRouter()

    const formSubmitHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        if(await signUp({email, isAdmin, password, username})){
            setEmail("")
            setIsAdmin(false)
            setPassword("")
            setUsername("")
            router.replace("/home")    
        }
    }

    const emailChangeHandler = (event: React.ChangeEvent) => (
        setEmail((event.target as HTMLInputElement).value)
    )

    const passwordChangeHandler = (event: React.ChangeEvent) => (
        setPassword((event.target as HTMLInputElement).value)
    )

    const usernameChangeHandler = (event: React.ChangeEvent) => (
        setUsername((event.target as HTMLInputElement).value)
    )

    const isAdminChangeHandler = (event: React.MouseEvent) => (
        setIsAdmin(!isAdmin) 
    )

    const loginButtonHandler = (event: React.MouseEvent) => {
        event.preventDefault()
        changeForm()
    }

    return (
        <Form onSubmit={formSubmitHandler} width="300px" height="380px" backgroundColor={colors.c2} justifyContent="space-evenly">
            <H1 fontSize="26px" color={colors.c4}>Join Us!</H1>
            
            <TextInput name="name" type="text" color={colors.c4} fontSize="20px" placeholder="Username" required onChange={usernameChangeHandler} value={username}/>

            <TextInput name="email" type="email" color={colors.c4} fontSize="20px" placeholder="Email" required onChange={emailChangeHandler} value={email}/>
            
            <TextInput name="password" type="password" color={colors.c4} fontSize="20px" placeholder="Password" 
            required onChange={passwordChangeHandler} value={password}/>

            <Checkbox name="admin" fontSize={20} color={colors.c4} value={isAdmin}onClick={isAdminChangeHandler}>Admin</Checkbox>

            <Div height="50px" justifyContent="space-around" alignItems="flex-end" width="100%" flexDirection="row-reverse">
                <Button type="signup" bgColor={colors.c3} 
                color={colors.c1}>Sign Up</Button>
                <Button type="login" bgColor={colors.c2} color={colors.c3} onClick={loginButtonHandler}>Login</Button>
            </Div>
        </Form>
    )
}

const LoginForm:React.FC<{colors: colorsProps, changeForm: Function}> = ({
    colors,
    changeForm
}) => {
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const formSubmitHander = async (event: React.FormEvent) => {
        event.preventDefault()
        
        if (await login({email, password})) {
            setEmail("")
            setPassword("")
            router.replace("/home")    
        }
        
    }

    const emailChangeHandler = (event: React.ChangeEvent) => (
        setEmail((event.target as HTMLInputElement).value)
    )

    const passwordChangeHandler = (event: React.ChangeEvent) => (
        setPassword((event.target as HTMLInputElement).value)
    )

    const signupButtonHandler = (event: React.MouseEvent) => {
        event.preventDefault()
        changeForm()
    }

    return (
        <Form onSubmit={formSubmitHander} width="300px" height="380px" backgroundColor={colors.c2} justifyContent="space-around">
            <H1 fontSize="26px" color={colors.c4}>Welcome Back!</H1>

            <TextInput name="email" type="email" color={colors.c4} fontSize="20px" placeholder="Email" required onChange={emailChangeHandler} value={email}/>

            <Div height="45px" justifyContent="center" flexDirection="column">
                <TextInput name="password" type="password" color={colors.c4} fontSize="20px" placeholder="Password" onChange={passwordChangeHandler} value={password}/>
                <Link href={"/resetpassword"} className="forgot-pass-link">I forgot my password</Link>
            </Div>
            
            <Div height="80px" justifyContent="space-around" alignItems="flex-end" width="100%" flexDirection="row-reverse">
                <Button type="login" bgColor={colors.c2} color={colors.c3}>Login</Button>
                
                <Button type="signup" bgColor={colors.c3} 
                color={colors.c1} onClick={signupButtonHandler}>Sign Up</Button>
            </Div>
        </Form>
    )
}

interface ResetPasswordFormProps {
    colors: colorsProps;

}

const ResetPasswordForm:React.FC<ResetPasswordFormProps> = ({
    colors,
}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rPassword, setRPassword] = useState("")
    const [emailChecked, setEmailChecked] = useState(false)
    const router = useRouter()

    const emailChangeHandler = (event: React.ChangeEvent) => {
        if(emailChecked) {
            setEmailChecked(!emailChecked)
        }
        setEmail((event.target as HTMLInputElement).value)
    }

    const passwordChangeHandler = (event: React.ChangeEvent) => {
        setPassword((event.target as HTMLInputElement).value)
    }
    const rPasswordChangeHandler = (event: React.ChangeEvent) => {
        const value = (event.target as HTMLInputElement).value
        setRPassword(value)
        if (value != password) {
            (event.target as HTMLInputElement).setCustomValidity("Passwords don't match!")
        } else {
            (event.target as HTMLInputElement).setCustomValidity("")
        }
    }

    const emailCheckHander = async (event: React.FormEvent) => {
        event.preventDefault()
         if(await checkEmail({email})) {
            setEmailChecked(!emailChecked)
         }
    }

    const passwordResetHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        if (await resetPassword({email, password})) {
            setEmail("")
            setPassword("")
            setRPassword("")
            router.replace("/home")
        }
    }

    return (
        <Div width="300px" height="380px" backgroundColor={colors.c4} borderRadius="10px" boxShadow={colors.c4} flexDirection="column" justifyContent="space-between">
            <Form onSubmit={emailCheckHander} width="300px" height="140px" backgroundColor={colors.c2} alignItems="center" justifyContent="space-around">
                <H1 color={colors.c1} fontSize="26px">Reset Your Password</H1>
                
                <Div Id="email-checker" color={colors.c4} height="26px">
                    <TextInput type="email" name="email" color={colors.c4} fontSize="20px" placeholder="Email" width="214px" required
                    value={email} onChange={emailChangeHandler}/>
                   
                    <Button type="icon"/>
                </Div>
            </Form>

            <Form onSubmit={passwordResetHandler} width="300px" height="239px" backgroundColor={colors.c2} justifyContent="space-around">
                <TextInput type="password" name="password" color={colors.c4} fontSize="20px" placeholder="New Password" readonly={!emailChecked} value={password} onChange={passwordChangeHandler}/>

                <TextInput type="password" name="r-password" color={colors.c4} fontSize="20px" placeholder="Repeat Password" readonly={!emailChecked}
                value={rPassword} onChange={rPasswordChangeHandler}/>

                <Button type="resetpassword" bgColor={colors.c4} color={colors.c2}disabled={!emailChecked}>Reset Password</Button>
            </Form>
        </Div>
    )

}

const FormCard:React.FC<FormCardProps> = ({
    type,
    isAdmin,
    colors,
    userID
}) => {

    const [formType, setFormType] = useState(false)

    const changeForm = () => setFormType(!formType)

    if (type == "resetpassword") {
        return <ResetPasswordForm colors={colors}/>
    }

    return (
            <Div alignItems="center" justifyContent="center" borderRadius="10px" boxShadow={colors.c3} >
                <Image width={250} height={380} src={"/imgs/cards/login-form.png"} alt="blue corals" className="login-card-img" priority/>

                {formType
                ?<SignUpForm colors={colors} changeForm={changeForm}/>
                :<LoginForm colors={colors} changeForm={changeForm}/>
                }
            </Div>
                
    )
}

export default FormCard