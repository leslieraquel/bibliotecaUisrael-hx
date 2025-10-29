import mongoose, { Schema, Document } from "mongoose";

export interface IEstudianteDocument extends Document {
  id: string;
  name: string;
  email: string;
  carrera: string;
  createdAt: Date;
  updateAt: Date;
}

const EstudianteSchema = new Schema<IEstudianteDocument>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  carrera: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updateAt: { type: Date, required: true },
});

export const EstudianteModel = mongoose.model<IEstudianteDocument>(
  "Estudiante",
  EstudianteSchema
);