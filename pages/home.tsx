import { GetStaticProps } from "next";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Div from "../components/Div";
import TextInput from "../components/TextInput";
import NumberInput from "../components/NumberInput";
import Form from "../components/Form";
import Checkbox from "../components/Checkbox";
import Button from "../components/Button";
import Image from "next/image";

export const getStaticProps: GetStaticProps = async () => {
  const subRes = await axios.get("http://localhost:3000/api/getallusers");
  const subbedUsers = subRes.data.subbedUsers;

  const color1 = "#FCF9F8"
  const color2 = "#2A292C"
  const color3 = "#2288E3"
  const color4 = "#99A6B4"
  const border = "10px"

  return {
    props: {
      subbedUsers,
      color1,
      color2,
      color3,
      color4,
      border
    },
    revalidate: 360,
  };
};

interface articlesProps {
  IdArticle: number;
  Title: string;
  Content: string;
  User_ID: number;
  Allowed: number;
}

interface pageProps {
  allRes: number;
  subbedUsers: number;
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  border: string;
}

export default function Page(props: pageProps) {
  const [articleTitle, setArticleTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [username, setUsername] = useState();
  const [userID, setUserID] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [actualArticle, setActualArticle] = useState(0)
  const router = useRouter();
  const [filterArticleTitle, setFilterArticleTitle] = useState("");
  const [filterArticleOwnerID, setFilterArticleOwnerID] = useState(0);
  const [filterArticleAllowed, setfilterArticleAllowed] = useState(isAdmin?true:false);
  const [resArticles, setResArticles] = useState([{
    IdArticle: 0,
    Title: "",
    Content: "",
    User_ID: 0,
    Allowed: 0,
  }]);
  
  const getArticlesHandler = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/getarticles", {
        title: filterArticleTitle,
        IdUsers: filterArticleOwnerID,
        allowed: filterArticleAllowed,
      });
      setResArticles(res.data.articles);
    } catch (err: any) {
      console.error("Error Name: " + err.name + "\nError Message: " + err.message);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/userbytoken");
        setUsername(res.data.msg.Username);
        setUserID(res.data.msg.IdUsers);
        setIsAdmin(res.data.msg.IsAdmin);
      } catch (err: any) {
        console.error(
          "Error Name: " + err.name + "\nError Message: " + err.message
        );
      }
    })();
  }, []);

  useEffect(() => {
    getArticlesHandler();
  }, [filterArticleTitle, filterArticleOwnerID, filterArticleAllowed]);

  const inputChangeHandler = (e: React.SyntheticEvent) => {
    const inputElement = e.target as HTMLInputElement;
    if (inputElement.name == "allowedFilter")
      setfilterArticleAllowed(!filterArticleAllowed);
    if (inputElement.name == "articleTitle")
      setArticleTitle(inputElement.value);
    if (inputElement.name == "articleContent")
      setArticleContent(inputElement.value);
    if (inputElement.name == "articleTitleFilter")
      setFilterArticleTitle(inputElement.value);
    if (inputElement.name == "idOwnerFilter")
      setFilterArticleOwnerID(Number(inputElement.value));
  };

  const disconnectHandler = () => {
    deleteCookie("loggedAs");
    router.reload();
  };

  const articleSubmitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/submitarticle", {
        articleTitle,
        articleContent,
      });
      setArticleContent("");
      setArticleTitle("");
      alert(res.data.msg);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const adminActionsHandler = async (IdArticle: number, command: boolean) => {
    try {
    const res = await axios.post("http://localhost:3000/api/adminactions", {
      IdArticle,
      command
    });

    alert(res.data.msg);
    await getArticlesHandler();
    return;
  } catch (err: any) {
    console.log(err.message)
  }
  };

  const changeActualArticle = async (increment: number) => {
    if ((actualArticle + increment) < 0) {
      setActualArticle(resArticles.length - 1)
      return
    }
    if ((actualArticle + increment) > (resArticles.length - 1)){
      setActualArticle(0)
      return
    }

    setActualArticle(actualArticle + increment)
  }

  return (
    <>
      <Head>
        <title>Homepage</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Div justifyContent="flex-start" alignItems="center" flexDirection="column" height="100%" width="100%" backgroundImage="background3.png" Id="homeAll">
        <Div alignItems="flex-end" flexDirection="row" width="90%" justifyContent="space-between" height="105px">
          <Div alignItems="flex-start" flexDirection="column" width="185px" justifyContent="center" height="64px" Id="user-card">
            <Image id="user-icon" src={'/img/user-icon.png'} alt="user icon" width={64} height={64}/>
            <span>{username}</span>
            <a onClickCapture={() => {
              disconnectHandler()
            }}>Disconnect</a>
          </Div>
          {isAdmin
          ?<span className="registered-users">Users registered: {props.subbedUsers}</span>
          :null}
          
        </Div>
        <Div width="100%" height="80%" justifyContent="space-evenly" alignItems="center" flexDirection="row" Id="homeMain">
          <Div width="380px" height="430px" justifyContent="space-evenly" alignItems="center" flexDirection="column" backgroundColor={props.color2} borderRadius="15px" boxShadow={props.color3} Id="submit-article">
              <h2>Submit an Article</h2>
            <Form height="280px" width="auto" onSubmit={articleSubmitHandler} backgroundColor="transparent">
              <TextInput fontSize="18px" name="articleTitle" placeholder="Title" textColor={props.color4} type="text" width="93%" value={articleTitle} onChange={inputChangeHandler} required/>
              <textarea name="articleContent" value={articleContent} cols={38} rows={12} placeholder="Content" onChange={inputChangeHandler} required/>
            </Form>
            <Div flexDirection="row" justifyContent="flex-end" alignItems="center" width="90%" height="auto">
              <Button buttonType="submit" backgroundColor={props.color2} textColor={props.color3} onClick={articleSubmitHandler}>Submit</Button>
            </Div>
          </Div>
          <Div width="380px" height="430px" justifyContent="space-between" alignItems="center" flexDirection="column" backgroundColor={props.color3} borderRadius="15px" boxShadow={props.color3}>
            <Div height="135px" backgroundColor={props.color2} width="100%" alignItems="center" flexDirection="column" justifyContent="space-around">
              <Div flexDirection="row" alignItems="center" height="auto" width="100%" justifyContent="space-evenly" >
                <span className="filter">Filters: </span>
                <NumberInput fontSize={18} textColor={props.color4} onChange={inputChangeHandler} name="idOwnerFilter">
                  User ID: 
                </NumberInput>
                {isAdmin
                ?<Checkbox fontSize={18} name="allowedFilter" textColor={props.color4} value={Number(filterArticleAllowed)} onClick={inputChangeHandler}>
                  Only Allowed
                </Checkbox>
                :null}
              </Div>
              <TextInput fontSize="18px" onChange={inputChangeHandler} value={filterArticleTitle} width="83%" placeholder="Search Title" textColor={props.color4} type="text" name="articleTitleFilter"/>
            </Div>
            <Div height="290px" backgroundColor={props.color2} width="100%" alignItems="center" flexDirection="column" justifyContent="space-around">
              <Div height="auto" backgroundColor={props.color2} width="100%" alignItems="center" flexDirection="row" justifyContent="center">
                <Button buttonType="icon" iconHeight={30} iconWidth={20} icon="img/right-arrow-icon.png" backgroundColor={props.color2} onClick={() => {
                  changeActualArticle(-1)
                }}/>
                <h3>{resArticles[actualArticle]?.Title}</h3>
                <Button buttonType="icon" iconHeight={30} iconWidth={20} icon="img/left-arrow-icon.png" backgroundColor={props.color2} onClick={() => {
                  changeActualArticle(1)
                }}/>
              </Div>
              <textarea name="" cols={40} rows={9} readOnly value={resArticles[actualArticle]?.Content}/>
              <Div height="auto" backgroundColor={props.color2} width="100%" alignItems="center" flexDirection="row" justifyContent="space-around">
                {isAdmin
                ? <span className="submited-articles">
                    Submited Articles: {resArticles.length}
                  </span>
                :null}
                <Div alignItems="center" flexDirection="row" height="auto" width="max-content" justifyContent="space-between">
                  {(isAdmin || userID == resArticles[actualArticle]?.User_ID)
                  ?<Button buttonType="icon" iconHeight={15} iconWidth={15} icon="icons/cross.png" backgroundColor={props.color2} onClick={() => {
                    const target = resArticles[actualArticle]
                    if (target){
                      adminActionsHandler(target.IdArticle, false)
                    }
                  }}/>
                  :null}
                  {(!filterArticleAllowed && isAdmin)
                  ?<Button buttonType="icon" iconHeight={15} iconWidth={15} icon="icons/correct.png" backgroundColor={props.color2} onClick={() => {
                    const target = resArticles[actualArticle]
                    if (target){
                      adminActionsHandler(target.IdArticle, true)
                    }
                  }}/>
                  :null}
                </Div>
              </Div>
            </Div>
          </Div>
        </Div>
      </Div>
    </>
  );
}
