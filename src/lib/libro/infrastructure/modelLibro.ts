import mongoose, { Schema, Document } from "mongoose";
import { ObjectId } from "mongodb";

export interface ILibroDocument extends Document {
  _id: ObjectId;
  title: string;
  isbn: string;
  editorial: string;
  year: string;
  idAutor: ObjectId | null;
  sinopsis: string;
  archivo: string;
  estado: string;
  createdAt: Date;
  updateAt: Date;

}

const LibroSchema = new Schema<ILibroDocument>({
  // id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  isbn: { type: String, required: true },
  editorial: { type: String, required: true },
  year: { type: String, required: true },
  idAutor: { type: mongoose.Schema.Types.ObjectId, ref: "autor", required: true },
  sinopsis: { type: String, required: true },
  archivo: { type: String, required: true },
  estado: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updateAt: { type: Date, required: true },
});

export const LibroModel = mongoose.model<ILibroDocument>(
  "libro",
  LibroSchema
);
