import mongoose, { Schema, Document } from "mongoose";


export interface UserDocument extends Document {
  ci: string;
  type :string;
  typeperfil:string;
  name :string;
  email: string;
  password: string;
  createdAt: Date;
  updateAt: Date;

}

const UserSchema = new Schema<UserDocument>({
  ci: { type: String, required: true, unique: true },
  type:{ type: String, required: true },
  typeperfil:{ type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export const UserModel = mongoose.model<UserDocument>(
  "User",
  UserSchema
);
