import mongoose, { Schema, Document } from "mongoose";

export interface IRegistroDocument extends Document {
  id: string;
  prestamoDate: Date;
  devolucionDate: Date;
  estado: string;
  idLibro: string;
  idEstudiante: string;
  createdAt: Date;
  updateAt: Date;



}

const RegistroSchema = new Schema<IRegistroDocument>({
  id: { type: String, required: true, unique: true },
  prestamoDate: { type: Date, required: true },
  devolucionDate: { type: Date, required: true },
  estado: { type: String, required: true },
  idLibro: { type: String, required: true },
  idEstudiante: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updateAt: { type: Date, required: true },

});

export const registroModel = mongoose.model<IRegistroDocument>(
  "registro",
  RegistroSchema
);