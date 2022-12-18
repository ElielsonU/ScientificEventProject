import { NextApiHandler } from "next";
import { updateUserPassword } from "./DatabaseConnection";

const handler: NextApiHandler = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({msg: "Missing values: (email or password)."})
    return
  }
  
  const token = await updateUserPassword({...req.body})
  if (!token) {
    res.status(404).json({msg: "Email doens't exists."})
    return
  }

  res.status(200).json({msg: token})
}

export default handler