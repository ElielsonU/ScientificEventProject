import { NextApiHandler } from "next";
import { registerUser } from "./DatabaseConnection";

const handler: NextApiHandler = async (req, res) => {

  if (!req.body.email|| !req.body.password|| !req.body.username|| typeof req.body.isAdmin != "boolean") {
    res.status(400).json({msg: "Missing values."})
    return
  }

  const msg = await registerUser(req.body);

  if (!msg) {
    res.status(401).json({msg: "This email already exists!."})
    return
  }

  res.status(200).json({msg})
}  

export default handler