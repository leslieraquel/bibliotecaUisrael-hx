import mongoose, { Schema, Document } from "mongoose";

export interface IAutorDocument extends Document {

    id: string;
      name: string;
      bio: string;
      createdAt: Date;
      updateAt: Date;
      
}

const autorSchema = new Schema<IAutorDocument>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  bio: { type: String, required: true },

});

export const autorModel = mongoose.model<IAutorDocument>(
  "autor",
  autorSchema
);