import { NextMiddleware, NextResponse } from "next/server";

const middleware: NextMiddleware = (req, e) => {
  const thisPath = req.nextUrl.pathname;
  const token = req.cookies.get("loggedAs");
  
  if (thisPath == "/login" && token) {
    return NextResponse.redirect("http://localhost:3000/home");
  }
  if (thisPath == "/home" && !token) {
    return NextResponse.redirect("http://localhost:3000/login")
  }
};

export default middleware;
