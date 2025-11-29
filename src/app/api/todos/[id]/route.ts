import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Todo } from "@/models/Todo";
import { protectedRoute } from "@/lib/protect";

export async function PUT(req: NextRequest, ctx: any) {
  await connectDB();
  const user = protectedRoute(req);
  if (!user) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  // `params` can be a Promise in App Router — unwrap it.
  const params = await ctx.params;

  const { title, completed } = await req.json();

  const decoded = user as { _id?: string; id?: string } | null;
  const userId = decoded?._id || decoded?.id;

  const updatedTodo = await Todo.findOneAndUpdate(
    { _id: params.id, userId },
    { ...(title !== undefined && { title }), ...(completed !== undefined && { completed }) },
    { new: true }
  );

  if (!updatedTodo) {
    return NextResponse.json({ success: false, message: "Todo not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, todo: updatedTodo });
}

export async function DELETE(req: NextRequest, ctx: any) {
  await connectDB();
  const user = protectedRoute(req);
  if (!user) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  const params = await ctx.params;

  const decoded = user as { _id?: string; id?: string } | null;
  const userId = decoded?._id || decoded?.id;

  const deletedTodo = await Todo.findOneAndDelete({ _id: params.id, userId });
  if (!deletedTodo) {
    return NextResponse.json({ success: false, message: "Todo not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: "Todo deleted" });
}
