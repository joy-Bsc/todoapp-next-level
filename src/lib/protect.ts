import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "./auth";

/**
 * Protect API routes by verifying JWT
 * Returns the user object if valid, otherwise responds with 401
 */
export function protectedRoute(req: NextRequest) {
  const user = getUserFromRequest(req);

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return user;
}
