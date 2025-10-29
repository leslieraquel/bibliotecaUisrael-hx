
import { estudiante } from "../domain/estudiante";
import { estudianteId } from "../domain/estudianteId";
import { estudianteName } from "../domain/estudianteNombre";
import { estudianteCarrera } from "../domain/estudianteCarer";
import { estudianteCreatedAt } from "../domain/estudianteCreateAt";
import { estudianteUpdateAt } from "../domain/estudianteUpdateAt";
import { estudianteCorreo } from "../domain/estudianteCorreo";
import { estudianteRepository } from "../domain/estudianteRepository";
import { EstudianteModel } from "./modelEstudiante";


export class InMemoryEstudianteRepository implements estudianteRepository {
  async create(est: estudiante): Promise<void> {
    const primitive = est.mapToPrimitives();
    await EstudianteModel.create({
      ...primitive,
      updateAt: est.updateAt.value,
    });
  }

  async getAll(): Promise<estudiante[]> {
    const docs = await EstudianteModel.find().lean();
    return docs.map(
      (d:any) =>
        new estudiante(
          new estudianteId(d.id),
          new estudianteName(d.name),
          new estudianteCorreo(d.email),
          new estudianteCreatedAt(d.createdAt),
          new estudianteCarrera(d.carrera),
          new estudianteUpdateAt(d.updateAt)
        )   
    );
  }

  async getOneById(id: estudianteId): Promise<estudiante | null> {
    const d = await EstudianteModel.findOne({ id: id.value }).lean();
    if (!d) return null;

    return new estudiante(
      new estudianteId(d.id),
      new estudianteName(d.name),
      new estudianteCorreo(d.email),
      new estudianteCreatedAt(d.createdAt),
      new estudianteCarrera(d.carrera),
      new estudianteUpdateAt(d.updateAt)
    );
  }

  async edit(est: estudiante): Promise<void> {
    await EstudianteModel.updateOne(
      { id: est.id.value },
      {
        $set: {
          name: est.name.value,
          email: est.email.value,
          createdAt:est.createdAt,
          carrera: est.carrera.value,
          updateAt: est.updateAt.value
        },
      }
    );
  }

  async delete(id: estudianteId): Promise<void> {
    await EstudianteModel.deleteOne({ id: id.value });
  }
}