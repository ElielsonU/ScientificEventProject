import { NextApiHandler } from "next";
import { getArticles, getUsers } from "./DatabaseConnection";

interface articlesProps {
  IdArticle: number;
  Title: string;
  Content: string;
  User_ID: number;
  Allowed: number;
}

const handler: NextApiHandler = async (req, res) => {
  const userIsAdmin = (await getUsers({token: req.cookies.loggedAs})).IsAdmin
  if (!userIsAdmin) {
    const articles: Array<articlesProps> = await getArticles({
      title: req.body.title,
      IdUsers: req.body.IdUsers, 
      allowed: true
      }
    )
    res.status(200).json({articles})
    return
  }
  const articles = await getArticles({
    allowed: req.body.allowed,
    IdUsers: req.body.IdUsers,
    title: req.body.title
  })
  res.status(200).json({articles})
}

export default handler