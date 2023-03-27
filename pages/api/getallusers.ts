import { NextApiHandler } from "next";
import { getUsers } from "./DatabaseConnection";

const handler: NextApiHandler = async (req, res) => {
  const msg = (await getUsers({})).length

  res.status(200).json({msg})
}

export default handler