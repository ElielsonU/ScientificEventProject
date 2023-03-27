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
  
  const token = req.cookies.loggedAs||req.body.loggedAs
  
  const userIsAdmin = (await getUsers({token})).IsAdmin
  if (!userIsAdmin) {
    const msg: Array<articlesProps> = await getArticles({
      title: req.body.title,
      IdUsers: req.body.IdUsers, 
      allowed: true
      }
    )
    res.status(200).json({msg})
    return
  }
  const msg = await getArticles({
    allowed: req.body.allowed,
    IdUsers: req.body.IdUsers,
    title: req.body.title
  })
  res.status(200).json({msg})
}

export default handler