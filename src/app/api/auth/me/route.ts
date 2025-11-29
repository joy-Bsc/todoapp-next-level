import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import  User  from "@/models/User";
import { getUserFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  await connectDB();
  const userData = getUserFromRequest(req);
  if (!userData) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  // Token payload uses `_id` when created in `login`/`register` routes.
  const decoded = userData as { _id?: string; id?: string } | null;
  const userId = decoded?._id || decoded?.id;
  const user = await User.findById(userId).select("-password");
  if (!user) {
    return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, user });
}
