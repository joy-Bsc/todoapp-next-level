import { NextRequest } from "next/server";
import { verifyToken } from "./tokens";

export function getUserFromRequest(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;

  const token = authHeader.split(" ")[1];
  //console.log(token);
  
  if (!token) return null;

  return verifyToken(token);
}
