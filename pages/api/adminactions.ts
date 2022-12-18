import { NextApiHandler } from "next";
import { adminCommands } from "./DatabaseConnection";

const handler: NextApiHandler = async (req, res) => {
  
  if (!req.body.IdArticle || typeof req.body.command != "boolean") {
    res.status(400).json({msg: "Missing values: (IdArticle: number or command: boolean)."})
    return
  }
  const success = await adminCommands({...req.body})
  if (!success) {
    res.status(404).json({msg: "Id doesn't exists."})
    return
  }
  res.status(200).json({msg: "Success"})
}

export default handler