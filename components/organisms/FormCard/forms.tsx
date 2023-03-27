import React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Link from "next/link";

import H1 from "../../cells/H1"; 
import Div from "../../cells/Div";
import Form from "../../cells/Form";
import Button from "../../cells/Button";
import Checkbox from "../../cells/Checkbox";
import TextInput from "../../cells/TextInput";
import NumberInput from "../../cells/NumberInput";

import { login, signUp, checkEmail, resetPassword, submitArticle, deleteArticle, addAcceptedArticle } from "./utils";
import Textarea from "../../cells/Textarea";
import { title } from "process";
import Span from "../../cells/Span";

type colorsProps = {
    c1: string;
    c2: string;
    c3: string;
    c4: string;
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
            
            <TextInput name="name" type="text" color={colors.c4} fontSize="18px" placeholder="Username" required onChange={usernameChangeHandler} value={username} maxLenght={45}/>

            <TextInput name="email" type="email" color={colors.c4} fontSize="18px" placeholder="Email" required onChange={emailChangeHandler} value={email} maxLenght={30}/>
            
            <TextInput name="password" type="password" color={colors.c4} fontSize="18px" placeholder="Password" 
            required onChange={passwordChangeHandler} value={password} maxLenght={35}/>

            <Checkbox name="admin" fontSize={18} color={colors.c4} value={isAdmin}onClick={isAdminChangeHandler}>Admin</Checkbox>

            <Div height="55px" justifyContent="space-around" alignItems="flex-end" width="100%" flexDirection="row-reverse">
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

    const formSubmitHandler = async (event: React.FormEvent) => {
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
        <Form onSubmit={formSubmitHandler} width="300px" height="380px" backgroundColor={colors.c2} justifyContent="space-around">
            <H1 fontSize="26px" color={colors.c4}>Welcome Back!</H1>

            <TextInput name="email" type="email" color={colors.c4} fontSize="18px" placeholder="Email" required onChange={emailChangeHandler} value={email} maxLenght={30} />

            <Div height="45px" justifyContent="center" flexDirection="column">
                <TextInput name="password" type="password" color={colors.c4} fontSize="18px" placeholder="Password" onChange={passwordChangeHandler} value={password} maxLenght={35} />
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

    const emailCheckHandler = async (event: React.FormEvent) => {
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
            <Form onSubmit={emailCheckHandler} width="300px" height="140px" backgroundColor={colors.c2} alignItems="center" justifyContent="space-around">
                <H1 color={colors.c1} fontSize="26px">Reset Your Password</H1>
                
                <Div Id="email-checker" color={colors.c4} height="26px">
                    <TextInput type="email" name="email" color={colors.c4} fontSize="20px" placeholder="Email" width="214px" required
                    value={email} onChange={emailChangeHandler} maxLenght={30}/>
                   
                    <Button type="icon" icon="send"/>
                </Div>
            </Form>

            <Form onSubmit={passwordResetHandler} width="300px" height="239px" backgroundColor={colors.c2} justifyContent="space-around">
                <TextInput type="password" name="password" color={colors.c4} fontSize="18px" placeholder="New Password" readonly={!emailChecked} value={password} onChange={passwordChangeHandler} maxLenght={35}/>

                <TextInput type="password" name="r-password" color={colors.c4} fontSize="18px" placeholder="Repeat Password" readonly={!emailChecked}
                value={rPassword} onChange={rPasswordChangeHandler} maxLenght={35}/>

                <Button type="resetpassword" bgColor={colors.c4} color={colors.c2}disabled={!emailChecked}>Reset Password</Button>
            </Form>
        </Div>
    )

}

interface SubmitArticleFormProps {
    colors: colorsProps;
    loggedAs?: string;
}

const SubmitArticleForm: React.FC<SubmitArticleFormProps> = ({
    colors,
    loggedAs
}) => {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const titleChangeHandler = (event: React.ChangeEvent) => {
        setTitle((event.target as HTMLInputElement).value)
    }

    const contentChangeHandler = (event: React.ChangeEvent) => {
        setContent((event.target as HTMLInputElement).value)
    }

    const formSubmitHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        if (await submitArticle({loggedAs, articleTitle: title, articleContent: content})) {
            setTitle("")
            setContent("")
        }
    }

    return (
        <Form onSubmit={formSubmitHandler} width="300px" height="380px" backgroundColor={colors.c2} justifyContent="space-around" borderRadius="10px" boxShadow={colors.c3}>
            <H1 color={colors.c3} fontSize="26px">Submit an Article</H1>

            <TextInput type="text" name="title" color={colors.c4} textAlign="center" 
            fontWeight="700" fontSize="17px" placeholder="Title" maxLenght={30} onChange={titleChangeHandler} value={title} required />

            <Textarea backgroundColor={colors.c2} borderRadius="10px" color={colors.c1} width="260px" height="160px" placeholder="Content" value={content}  onChange={contentChangeHandler} maxLength={2000} required/>

            <Div width="270px" justifyContent="flex-end" height="58px" alignItems="center" Id="submit-article-div">
                <Button type="submit" color={colors.c3} >Submit</Button>
            </Div>
        </Form>
    )
}

interface articlesProps {
    IdArticle: number;
    Content: string;
    User_ID: number;
    Allowed: number;
    Title: string;
}

type UserProps = {
    IdUsers?: number;
    Username?: string;
    IsAdmin?: boolean;
    Password: string;
    Email: string;
    Token: string;
}

interface ViewArticlesFormProps {
    articles?: {
        allowed: Array<articlesProps>;
        notAllowed: Array<articlesProps>;
    };
    colors: colorsProps;
    user?: UserProps;
}

const ViewArticlesForm:React.FC<ViewArticlesFormProps> = ({
    articles,
    colors,
    user,
}) => {
    const [allArticles, setAllarticles] = useState(articles)
    const [articlesList, setArticlesList] = useState( allArticles?.allowed )
    const [allowedArticles, setAllowedArticles] = useState(false)
    const [actualArticle, setActualArticle] = useState(0)
    const [userId, setUserId] = useState(0)
    const [title, setTitle] = useState("")

    useEffect(() => {
        if (!user?.IsAdmin){
            setAllowedArticles(true)
        }
    })

    useEffect(() => {
        const usedArticles = allowedArticles
        ?allArticles?.allowed
        :allArticles?.notAllowed

        const articlesFiltered = usedArticles?.filter((value) => {
            const articleTitle= value.Title.toLowerCase()
            if (userId) {
                return articleTitle.includes(title.toLowerCase()) && 
                value.User_ID == userId
            } else {
                return articleTitle.includes(title)
            }
        })
        setArticlesList(articlesFiltered)
        setActualArticle(0)
    }, [userId, title])

    const allowedChangeHandler = (event:React.MouseEvent) => {
        setAllowedArticles(allowedArticles?false:true)
        if (!allowedArticles){
            return setArticlesList(articles?.allowed)
        }

        setArticlesList(articles?.notAllowed)
    }  

    const titleChangeHandler = (event:React.ChangeEvent) => {
        setTitle((event.target as HTMLInputElement).value)
    }

    const nextArticle = () => {
        const length = articlesList?.length || -1
        if(actualArticle + 1 >= length) { return setActualArticle(0) }
        setActualArticle(actualArticle + 1)
    }

    const previousArticle = () => {
        const length = articlesList?.length || 1
        if(actualArticle - 1 < 0) { return setActualArticle(length-1) }
        setActualArticle(actualArticle - 1)
    }

    const removeArticle = async () => {
        const IdArticle = articlesList?.at(actualArticle)?.IdArticle
        if  (await deleteArticle({IdArticle}))
        {
            setActualArticle(actualArticle-1)
            if (allowedArticles) {
                return allArticles?.allowed.splice(actualArticle, 1)
            }
            allArticles?.notAllowed.splice(actualArticle, 1)
            setArticlesList(allArticles?.notAllowed)
        }
    }

    const acceptArticle = async () => {
        const acceptedArticle = allArticles?.notAllowed.at(actualArticle)
        if  (await addAcceptedArticle({IdArticle: acceptedArticle?.IdArticle}))
        {
            setActualArticle(0)
            allArticles?.notAllowed.splice(actualArticle, 1)
            if (acceptedArticle) {
                allArticles?.allowed.push(acceptedArticle)
            }
            setArticlesList(allArticles?.notAllowed)
        }
    }

    return (
        <Div width="300px" height="380px" backgroundColor={colors.c3} justifyContent="space-between" borderRadius="10px" boxShadow={colors.c3} flexDirection="column">
            <Form onSubmit={() => {}} width="300px" height="130px" backgroundColor={colors.c2} alignItems="space-evenly" justifyContent="space-around">
                <Div width="100%" justifyContent="space-evenly">
                    <H1 color={colors.c4} fontSize="13px">Filters: </H1>

                    <NumberInput name="user-id" setValue={setUserId} value={userId} color={colors.c4} fontSize={13}>User ID</NumberInput>

                    {user?.IsAdmin
                    ?<Checkbox fontSize={13} color={colors.c4} onClick={allowedChangeHandler} value={allowedArticles}>Only allowed</Checkbox> 
                    :null}
                </Div>

                <TextInput name="title" type="text" color={colors.c4} fontSize="18px" placeholder="Search by Title" value={title} onChange={titleChangeHandler}/>
            </Form>
            <Div backgroundColor={colors.c2} height="248px" width="300px" alignItems="center" justifyContent="space-around" flexDirection="column">
                <Div height="30px" alignItems="flex-end" width="250px" justifyContent="space-between" >
                    <Button type="icon" icon="arrow-left" iconHeight={20} iconWidth={15} onClick={previousArticle}/>

                    <Div Id="article-title">
                        <H1 fontSize="20px" color={colors.c1}> 
                            {articlesList?.at(actualArticle)?.Title} 
                        </H1>
                    </Div>
                    
                    
                    <Button type="icon" icon="arrow-right" iconHeight={20} iconWidth={15} onClick={nextArticle}/>
                </Div>

                <Textarea backgroundColor={colors.c2} width="250px" borderRadius="10px" color={colors.c4} height="150px" 
                value={articlesList?.at(actualArticle)?.Content||"  "} readonly/>
                <Div justifyContent="space-between" alignItems="center" width="250px">
                    {user?.IsAdmin
                    ?<Span color={colors.c4} fontSize="12px">submited Articles: {articlesList?.length}</Span>
                    :null}
                    <Div>
                        { user?.IsAdmin || user?.IdUsers == articlesList?.at(actualArticle)?.User_ID
                        ? <Button type="icon" icon="cross" iconHeight={10} iconWidth={10} onClick={removeArticle}/>
                        : null }
                        
                        {allowedArticles? null
                        :<Button type="icon" icon="correct" iconHeight={10} iconWidth={10} onClick={acceptArticle}/>}
                    </Div>
                </Div>
            </Div>
        </Div>
    )
}

export {LoginForm, SignUpForm, ResetPasswordForm, SubmitArticleForm, ViewArticlesForm}