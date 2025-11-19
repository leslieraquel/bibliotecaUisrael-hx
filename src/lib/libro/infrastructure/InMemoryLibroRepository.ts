
import { libro } from "../domain/libro";
import { libroId } from "../domain/libroId";
import { libroTitle } from "../domain/libroTitle";
import { libroEditorial } from "../domain/libroEditorial";
import { libroIsbn } from "../domain/libroIsbn";
import { libroCreatedAt } from "../domain/libroCreatedAt";
import { libroUpdateAt } from "../domain/libroUpdateAt";
import { libroYear } from "../domain/libroYear";
import { libroIdAutor } from "../domain/libroIdAutor";
import { Types } from "mongoose";
import { libroSinopsis } from "../domain/libroSinopsis";
import { libroArchivo } from "../domain/libroArchivo";
import { libroEstado } from "../domain/libroEstado";
import { LibroRepository } from "../domain/libroRepository";
import { LibroModel } from "./modelLibro";



export class InMemoryLibroRepository implements LibroRepository {
  // constructor(private collection: Collection) {}

   private toDomain(d: any): libro {
        return new libro(
          new libroTitle(d.title),
          new libroIsbn(d.isbn),
          new libroEditorial(d.editorial),
          new libroYear(d.year),
          new libroIdAutor(d.idAutor),
          new libroSinopsis(d.sinopsis),
          new libroArchivo(d.archivo),
          new libroEstado(d.estado),
          new libroCreatedAt(d.createdAt),
          new libroUpdateAt(d.updateAt),
          new libroId(d._id.toString())
        );
    }

  async create(lib: libro): Promise<void> {
    const primitive = lib.mapToPrimitives();
    await LibroModel.create({
      ...primitive,
      updateAt: lib.updateAt.value,
    });
  }

  async getAll(): Promise<libro[]> {
    const docs = await LibroModel.find().lean();
    return docs.map(
      (d:any) =>
        new libro(
          new libroTitle(d.title),
          new libroIsbn(d.isbn),
          new libroEditorial(d.editorial),
          new libroYear(d.year),
          new libroIdAutor(d.idAutor),
          new libroSinopsis(d.sinopsis),
          new libroArchivo(d.archivo),
          new libroEstado(d.estado),
          new libroCreatedAt(d.createdAt),
          new libroUpdateAt(d.updateAt),
          new libroId(d._id.toString())
          
        )   
    );
  }


 async searchByMongoId(id: string): Promise<libro | null> {
    const d = await LibroModel.findById(id).lean();
    if (!d) return null;
    return this.toDomain(d);
  }

  async edit(lib: libro): Promise<void> {
    
    await LibroModel.updateOne(
      { _id: new Types.ObjectId(lib.id?.value) },
      {
        $set: {
          name: lib.title.value,
          isbn: lib.isbn.value,
          editorial: lib.editorial.value,
          year: lib.year.value,
          idAutor:lib.idAutor.value,
          sinopsis:lib.sinopsis.value,
          archivo:lib.archivo.value,
          estado:lib.estado.value,
          createdAt: lib.updateAt.value,
          updateAt: lib.updateAt.value,

        },
      }
    );
  }

  async delete(id: libroId): Promise<void> {
    await LibroModel.deleteOne({ id: id.value });
  }
}