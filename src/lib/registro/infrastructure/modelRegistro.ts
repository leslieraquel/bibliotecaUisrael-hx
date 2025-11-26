import mongoose, { Schema, Document } from "mongoose";
import { ObjectId } from "mongodb";


export interface IRegistroDocument extends Document {
  _id: ObjectId;
  prestamoDate: Date;
  devolucionDate: Date;
  estado: string;
  idLibro: string;
  idEstudiante: string;
  createdAt: Date;
  updateAt: Date;



}

const RegistroSchema = new Schema<IRegistroDocument>({
  // id: { type: String, required: true, unique: true },
  prestamoDate: { type: Date, required: true },
  devolucionDate: { type: Date, required: true },
  estado: { type: String, required: true },
  idLibro: { type: String, required: true },
  idEstudiante: { type: String, required: true }

});

export const registroModel = mongoose.model<IRegistroDocument>(
  "registro",
  RegistroSchema
);