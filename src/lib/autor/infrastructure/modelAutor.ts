import mongoose, { Schema, Document } from "mongoose";
import { ObjectId } from "mongodb";
export interface IAutorDocument extends Document {

      _id: ObjectId;
      name: string;
      bio: string;
      createdAt: Date;
      updateAt: Date;
      
}

const autorSchema = new Schema<IAutorDocument>({
 // id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  bio: { type: String, required: true },

});

export const autorModel = mongoose.model<IAutorDocument>(
  "autor",
  autorSchema
);