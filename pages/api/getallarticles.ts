import { NextApiHandler } from "next";
import { getArticles } from "./DatabaseConnection";

const handler: NextApiHandler = async (req, res) => {
  const allArt = (await getArticles({
    allowed: true,
    IdUsers: 0,
    title: ""
  })).length
  const notAllArt = (await getArticles({
    allowed: false,
    IdUsers: 0,
    title: ""
  })).length
  res.status(200).json({msg: notAllArt + allArt})
}

export default handler