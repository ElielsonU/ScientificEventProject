import { NextApiHandler } from "next";
import { addNewArticle, getUsers } from "./DatabaseConnection";

const handler: NextApiHandler = async (req, res) => {
  const token = req.cookies.loggedAs||req.body.loggedAs

  if (!token || !req.body.articleTitle || !req.body.articleContent) {
    res.status(400).json({ msg: "Missing values." });
    return;
  }
  const user = await getUsers({token});
  if (!user){
    res.status(401).json({ msg: "Invalid token." });
    return;
  }
  
  await addNewArticle({...req.body, IdUsers: user.IdUsers, defAllowed: !!user.IsAdmin});
  res.status(200).json({msg: "Success!"});
}
export default handler