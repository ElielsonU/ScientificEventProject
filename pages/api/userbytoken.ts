import { getUsers } from "./DatabaseConnection";
import { NextApiHandler } from "next";
const handler: NextApiHandler = async (req, res) => {
  if (!req.cookies.loggedAs) {
    res.status(400).json({ msg: "Missing values." });
    return;
  }
  const msg = (await getUsers({token: req.cookies.loggedAs}));

  if (!msg) {
    res.status(401).json({ msg: "Invalid token." });
  }

  res.status(200).json({ msg });
  return;
};
export default handler;
