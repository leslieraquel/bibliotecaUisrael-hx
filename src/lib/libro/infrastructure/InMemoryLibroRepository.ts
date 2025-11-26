
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
          new libroId(d._id.toString()),
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
    const docs = await LibroModel.find()
            .populate("idAutor", "name");
    return docs.map(
      (d:any) =>
        new libro(
          new libroId(d._id.toString()),
          new libroTitle(d.title),
          new libroIsbn(d.isbn),
          new libroEditorial(d.editorial),
          new libroYear(d.year),
          new libroIdAutor(d.idAutor?._id?.toString()),
          new libroSinopsis(d.sinopsis),
          new libroArchivo(d.archivo),
          new libroEstado(d.estado),
          new libroCreatedAt(d.createdAt),
          new libroUpdateAt(d.updateAt),
          
        )   
    );
  }


 async searchByMongoId(id: string): Promise<libro | null> {
    const d = await LibroModel.findById(id).lean();
    if (!d) return null;
    return this.toDomain(d);
  }

  async edit(lib: libro): Promise<void> {
    console.log(lib.id?.value);
    if (!lib.id) {
        throw new Error("El libro no tiene id, no se puede actualizar");
    }
    
    await LibroModel.updateOne(
      { _id: new Types.ObjectId(lib.id?.value) },
      {
        $set: {
          title: lib.title.value,
          isbn: lib.isbn.value,
          editorial: lib.editorial.value,
          year: lib.year.value,
          idAutor:lib.idAutor.value,
          sinopsis:lib.sinopsis.value,
          archivo:lib.archivo.value,
          estado:lib.estado.value,
          createdAt: lib.createdAt.value,
          updateAt: lib.updateAt.value
        },
      }
    );
  }

  async delete(id: libroId): Promise<void> {
    await LibroModel.deleteOne({ id: id.value });
  }

  async findByIds(ids: string[]): Promise<libro[]> {
    const docs = await LibroModel.find({ _id: { $in: ids } })
    .populate("idAutor", "name")   // población del autor
    .lean();

    // Convertir los documentos a objetos de dominio
    // if (!d.idAutor) throw new Error(`Libro ${d._id} no tiene idAutor`);
    return docs.map(d => {
    if (!d._id) throw new Error('Libro con _id nulo');
    if (!d.idAutor) throw new Error(`Libro ${d._id} no tiene idAutor`);

  return new libro(
      new libroId(d._id.toString()),
      new libroTitle(d.title),
      new libroIsbn(d.isbn),
      new libroEditorial(d.editorial),
      new libroYear(d.year),
      new libroIdAutor(d.idAutor._id.toString()),
      new libroSinopsis(d.sinopsis),
      new libroArchivo(d.archivo),
      new libroEstado(d.estado),
      new libroCreatedAt(d.createdAt),
      new libroUpdateAt(d.updateAt)
  );
});
  }
  async findNotInIds(ids: string[]): Promise<libro[]> {
  // Mongoose: $nin = "not in"
  const docs = await LibroModel.find({ _id: { $nin: ids } })
    .populate("idAutor", "name")  // si quieres poblar autor
    .lean();

  return docs.map(d => {
    if (!d._id) throw new Error('Libro con _id nulo');
    if (!d.idAutor?._id) throw new Error(`Libro ${d._id} no tiene autor`);

    return new libro(
      new libroId(d._id.toString()),
      new libroTitle(d.title),
      new libroIsbn(d.isbn),
      new libroEditorial(d.editorial),
      new libroYear(d.year),
      new libroIdAutor(d.idAutor._id.toString()),
      new libroSinopsis(d.sinopsis),
      new libroArchivo(d.archivo),
      new libroEstado(d.estado),
      new libroCreatedAt(d.createdAt),
      new libroUpdateAt(d.updateAt)
    );
  });
}
}