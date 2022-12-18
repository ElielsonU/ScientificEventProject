import { NextApiHandler } from "next";
import { getUsers } from "./DatabaseConnection";

const handler: NextApiHandler = async (req, res) => {
  const email = req.body.email
  if(!email) {
    res.status(400).json({msg: "Missing email"})
    return
  }
  const user = await getUsers({email})
  if(!user) {
    res.status(404).json({msg: "Email doesn't exists"})
    return
  }
  res.status(200).json({msg: "User Exists!"})
}

export default handler