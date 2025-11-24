import { autor } from "../domain/autor";
import { autorNombre } from "../domain/autorNombre";
import { autorUpdateAt } from "../domain/autorUpdateAt";
import { autorCreatedAt } from "../domain/autorCreatedAt";
import { autorId } from "../domain/autorId";
import { autorBio } from "../domain/autorBio";
import { AutorRepository } from "../domain/autorRepository";
import { autorModel } from "./modelAutor";
import { Types } from "mongoose";

export class InMemoryAutorRepository implements AutorRepository {
  
  // AGREGAR EL MÉTODO toDomain QUE FALTA
  private toDomain(d: any): autor {
    return new autor(
      new autorId(d._id.toString()), // Convertir ObjectId a string
      new autorNombre(d.name),
      new autorBio(d.bio),
      new autorCreatedAt(d.createdAt),
      new autorUpdateAt(d.updateAt)
    );
  }

  async create(aut: autor): Promise<void> {
    const primitive = aut.mapToPrimitives();
    
    // Si el autor no tiene ID (es nuevo), crear sin _id
    if (!aut.id?.value) {
      const doc = await autorModel.create({
        name: primitive.name,
        bio: primitive.bio,
        createdAt: primitive.createdAt,
        updateAt: primitive.updateAt,
      });
      
      // Actualizar la entidad con el _id generado por MongoDB
      aut.updateId(new autorId(doc._id.toString()));
    } else {
      // Si ya tiene ID, actualizar
      await autorModel.create({
        _id: new Types.ObjectId(aut.id.value), // Usar el ID existente
        name: primitive.name,
        bio: primitive.bio,
        createdAt: primitive.createdAt,
        updateAt: primitive.updateAt,
      });
    }
  }

  async getAll(): Promise<autor[]> {
    const docs = await autorModel.find().lean();
    return docs.map((d: any) => this.toDomain(d)); // Usar toDomain
  }

async searchByMongoId(id: string): Promise<autor | null> {
    // Asumiendo que usas MongoDB y tienes un modelo llamado autorModel
    const d = await autorModel.findById(id).lean();
    if (!d) return null;
    return this.toDomain(d);
}

  async edit(aut: autor): Promise<void> {
    console.log(aut.id?.value);
    
    if (!aut.id) {
      throw new Error("El autor no tiene id, no se puede actualizar");
    }

    await autorModel.updateOne(
      { _id: new Types.ObjectId(aut.id.value) }, // Usar aut.id.value directamente
      {
        $set: {
          name: aut.name.value,
          bio: aut.bio.value,
          createdAt: aut.createdAt.value,
          updateAt: aut.updateAt.value,
        },
      }
    );
  }

  async delete(id: autorId): Promise<void> {
    // CORREGIR: Usar _id en lugar de id
    await autorModel.deleteOne({ _id: new Types.ObjectId(id.value) });
  }

  // Método adicional para buscar por ID string (opcional)
  async getOneById(id: string): Promise<autor | null> {
    const d = await autorModel.findById(id).lean();
    if (!d) return null;
    return this.toDomain(d);
  }
}