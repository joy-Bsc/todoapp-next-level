import mongoose, { Schema, Document, Model } from "mongoose";
import { IUser } from "@/types/user";

export interface IUserModel extends Omit<IUser, "_id">, Document {}

const UserSchema: Schema<IUserModel> = new Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    email: { type: String, required: [true, "Email is required"], unique: true },
    password: { type: String, required: [true, "Password is required"] },
  },
  { timestamps: true }
);

const User: Model<IUserModel> = (mongoose.models.User as Model<IUserModel>) || mongoose.model<IUserModel>("User", UserSchema);

export default User;