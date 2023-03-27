import axios from "axios";
import { setCookie } from "cookies-next";

interface loginProps {
    email: string; 
    password: string;
} 

const login = async (props: loginProps) => {
    try {
        const res = await axios.post("/api/login", props)
        const cookie = res.data.msg
        setCookie("loggedAs", cookie)
        return true
    } catch (e: any) {
            alert(e.response.data.msg)
            return false
    }
}

interface signUpProps {
    username: string;
    password: string;
    email: string;
    isAdmin: boolean;
}

const signUp = async (props: signUpProps) => {
    try {
        const res = await axios.post("/api/signup", props)
        const cookie = res.data.msg
        setCookie("loggedAs", cookie)
        return true
    } catch (e: any) {
        alert(e.response.data.msg)
        return false
    }
}

interface checkEmailProps {
    email: string;
}

const checkEmail = async (props: checkEmailProps) => {
    try {
        const res = await axios.post("/api/useremailexists", props)
        return true
    } catch (e: any) {
        alert(e.response.data.msg)
        return false
    }
}

interface resetPasswordProps {
    email: string;
    password: string;
}

const resetPassword = async (props: resetPasswordProps) => {
    try {
        const res = await axios.post("/api/resetpassword", props)
        const cookie = res.data.msg
        setCookie("loggedAs", cookie)
        return true
    } catch (e: any) {
        alert(e.response.data.msg)
        return false
    }
}

interface submitArticleProps {
    articleTitle: string;
    articleContent: string;
    loggedAs?: string;
}

const submitArticle = async (props: submitArticleProps) => {
    try {
        const res = await axios.post("/api/submitarticle", props)
        alert(res.data.msg)
        return true
    } catch (e: any) {
        alert(e.response.data.msg)
        return false
    }
}

interface adminActionsArticleProps {
    IdArticle?: number;
}

const deleteArticle = async (props: adminActionsArticleProps) => {
    try {
        const res = await axios.post("/api/adminactions", {...props, command: false})
        alert(res.data.msg)
        return true
    } catch (e: any) {
        alert(e.response.data.msg)
        return false
    }
}

const addAcceptedArticle = async (props: adminActionsArticleProps) => {
    try {
        const res = await axios.post("/api/adminactions", {...props, command: true})
        alert(res.data.msg)
        return true
    } catch (e: any) {
        alert(e.response.data.msg)
        return false
    }
}


export {login, signUp, checkEmail, resetPassword, submitArticle, deleteArticle, addAcceptedArticle}