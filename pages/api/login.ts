import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { loginToUser } from "./DatabaseConnection";

const handler: NextApiHandler = async (req, res) => {

  if(!req.body.email || !req.body.password) {
    res.status(400).json({msg : "Missing email or password in request body."})
    return
  }

  const msg = (await loginToUser(req.body))?.Token

  if (!msg) {
    res.status(401).json({msg: 'Incorrect email or password.'})
    return
  }

  res.status(200).json({msg});
}

export default handler
