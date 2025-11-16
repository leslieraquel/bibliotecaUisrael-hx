import mongoose, { Schema, Document } from "mongoose";

export interface ILibroDocument extends Document {
  id: string;
  title: string;
  isbn: string;
  editorial: string;
  year: string;
  idAutor:string;
  createdAt: Date;
  updateAt: Date;

}

const LibroSchema = new Schema<ILibroDocument>({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  isbn: { type: String, required: true },
  editorial: { type: String, required: true },
  year: { type: String, required: true },
  idAutor: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updateAt: { type: Date, required: true },
});

export const LibroModel = mongoose.model<ILibroDocument>(
  "libro",
  LibroSchema
);
