import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  console.log(req.body)
  res.status(200).json({msg: "valeu, meu chegado!"})
}  

export default handler