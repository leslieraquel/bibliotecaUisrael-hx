
import { libro } from "../domain/libro";
import { libroId } from "../domain/libroId";
import { libroTitle } from "../domain/libroTitle";
import { libroEditorial } from "../domain/libroEditorial";
import { libroIsbn } from "../domain/libroIsbn";
import { libroCreatedAt } from "../domain/libroCreatedAt";
import { libroUpdateAt } from "../domain/libroUpdateAt";
import { libroYear } from "../domain/libroYear";
import { libroIdAutor } from "../domain/libroIdAutor";
import { LibroRepository } from "../domain/libroRepository";
import { LibroModel } from "./modelLibro";


export class InMemoryLibroRepository implements LibroRepository {
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
          new libroId(d.id),
          new libroTitle(d.title),
          new libroIsbn(d.isbn),
          new libroEditorial(d.editorial),
          new libroYear(d.year),
          new libroIdAutor(d.idAutor),
          new libroCreatedAt(d.createdAt),
          new libroUpdateAt(d.updateAt)
        )   
    );
  }

  async getOneById(id: libroId): Promise<libro | null> {
    const d = await LibroModel.findOne({ id: id.value }).lean();
    if (!d) return null;

    return new libro(
       new libroId(d.id),
          new libroTitle(d.title),
          new libroIsbn(d.isbn),
          new libroEditorial(d.editorial),
          new libroYear(d.year),
          new libroIdAutor(d.idAutor),
          new libroCreatedAt(d.createdAt),
          new libroUpdateAt(d.updateAt)
    );
  }

  async edit(lib: libro): Promise<void> {
    await LibroModel.updateOne(
      { id: lib.id.value },
      {
        $set: {
          name: lib.title.value,
          isbn: lib.isbn.value,
          editorial: lib.editorial.value,
          year: lib.year.value,
          idAutor:lib.idAutor.value,
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