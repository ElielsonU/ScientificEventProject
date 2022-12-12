import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { loginToUser } from "./DatabaseConnection";

const handler: NextApiHandler = async (req, res) => {
  const msg = (await loginToUser(req.body))?.Token
  if (!msg) {
    res.status(401).json({msg: 'Incorrect credentials!'})
    return
  }

  res.status(200).json({msg});
}

export default handler
