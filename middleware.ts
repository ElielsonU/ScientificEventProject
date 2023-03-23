import { NextMiddleware, NextResponse } from "next/server";

const middleware: NextMiddleware = (req, e) => {
  // console.log(req.nextUrl.pathname)
  const thisPath = req.nextUrl.pathname;
  const token = req.cookies.get("loggedAs");
  
  if ((thisPath == "/login" || thisPath == "/resetpassword") && token) {
    return NextResponse.redirect("http://localhost:3000/home");
  }
  else if (thisPath == "/home" && !token) {
    return NextResponse.redirect("http://localhost:3000/login")
  }
};

export default middleware;
