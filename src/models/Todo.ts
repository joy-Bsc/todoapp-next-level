import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITodoDocument extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TodoSchema = new Schema<ITodoDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Todo: Model<ITodoDocument> =
  mongoose.models.Todo || mongoose.model<ITodoDocument>("Todo", TodoSchema);
export default Todo;