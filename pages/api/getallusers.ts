import { NextApiHandler } from "next";
import { getUsers } from "./DatabaseConnection";

const handler: NextApiHandler = async (req, res) => {
  const subbedUsers = (await getUsers({})).length
  res.status(200).json({subbedUsers})
}

export default handler