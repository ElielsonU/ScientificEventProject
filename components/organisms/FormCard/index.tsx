import React from "react";
import { useState } from "react";

import Image from "next/image";
import Div from "../../cells/Div";

import { LoginForm, SignUpForm, ResetPasswordForm, SubmitArticleForm, ViewArticlesForm } from "./forms";

type colorsProps = {
    c1: string;
    c2: string;
    c3: string;
    c4: string;
}

type UserProps = {
    Username?: string;
    IsAdmin?: boolean;
    Password: string;
    Email: string;
    Token: string;
}

interface articlesProps {
    IdArticle: number;
    Content: string;
    User_ID: number;
    Allowed: number;
    Title: string;
}

interface FormCardProps {
    type: "login"|"resetpassword"|"submitarticle"|"viewarticles";
    colors: colorsProps;
    articles?: {
        allowed: Array<articlesProps>;
        notAllowed: Array<articlesProps>;
    };
    subbedUsers?: number;
    user?: UserProps;
}

const FormCard:React.FC<FormCardProps> = ({
    type,
    user,
    colors,
    articles,
}) => {

    const [formType, setFormType] = useState(false)

    const changeForm = () => setFormType(!formType)

    if (type == "resetpassword") {
        return <ResetPasswordForm colors={colors}/>
    }

    if (type == "submitarticle") {
        return <SubmitArticleForm colors={colors} loggedAs={user?.Token}/>
    }

    if (type == "viewarticles") {
        return <ViewArticlesForm colors={colors} articles={articles} user={user}/>
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