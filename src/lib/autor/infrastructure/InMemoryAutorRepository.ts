
import { autor } from "../domain/autor";
import { autorNombre } from "../domain/autorNombre";
import { autorUpdateAt } from "../domain/autorUpdateAt";
import { autorCreatedAt } from "../domain/autorCreatedAt";
import { autorId } from "../domain/autorId";
import { autorBio } from "../domain/autorBio";
import { AutorRepository } from "../domain/autorRepository";
import { autorModel } from "./modelAutor";


export class InMemoryAutorRepository implements AutorRepository {
  async create(aut: autor): Promise<void> {
    const primitive = aut.mapToPrimitives();
    await autorModel.create({
      ...primitive,
      updateAt: aut.updateAt.value,
    });
  }

  async getAll(): Promise<autor[]> {
    const docs = await autorModel.find().lean();
    return docs.map(
      (d:any) =>
        new autor(
          new autorId(d.id),
          new autorNombre(d.name),
          new autorBio(d.bio),
          new autorCreatedAt(d.createdAt),
          new autorUpdateAt(d.updateAt),
        )   
    );
  }

  async getOneById(id: autorId): Promise<autor | null> {
    const d = await autorModel.findOne({ id: id.value }).lean();
    if (!d) return null;

    return new autor(
      new autorId(d.id),
          new autorNombre(d.name),
          new autorBio(d.bio),
          new autorCreatedAt(d.createdAt),
          new autorUpdateAt(d.updateAt),
    );
  }

  async edit(aut: autor): Promise<void> {
    await autorModel.updateOne(
      { id: aut.id.value },
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
    await autorModel.deleteOne({ id: id.value });
  }
}