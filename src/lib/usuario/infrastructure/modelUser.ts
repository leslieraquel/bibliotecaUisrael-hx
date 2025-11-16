import mongoose, { Schema, Document } from "mongoose";

export interface UserDocument extends Document {
  ci: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updateAt: Date;

}

const UserSchema = new Schema<UserDocument>({
  ci: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updateAt: { type: Date, required: true },
});

export const UserModel = mongoose.model<UserDocument>(
  "User",
  UserSchema
);
