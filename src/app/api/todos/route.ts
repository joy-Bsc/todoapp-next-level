import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Todo } from "@/models/Todo";
import { protectedRoute } from "@/lib/protect";

export async function GET(req: NextRequest) {
  await connectDB();
  const user = protectedRoute(req);
  if (!user) return;

  const decoded = user as { _id?: string; id?: string } | null;
  const userId = decoded?._id || decoded?.id;

  const todos = await Todo.find({ userId });
  return NextResponse.json({ success: true, todos });
}

export async function POST(req: NextRequest) {
  await connectDB();
  const user = protectedRoute(req);
  if (!user) return;

  const { title } = await req.json();
  if (!title) {
    return NextResponse.json({ success: false, message: "Title is required" }, { status: 400 });
  }
  const decoded = user as { _id?: string; id?: string } | null;
  const userId = decoded?._id || decoded?.id;

  const todo = await Todo.create({ title, userId });
  return NextResponse.json({ success: true, todo });
}
