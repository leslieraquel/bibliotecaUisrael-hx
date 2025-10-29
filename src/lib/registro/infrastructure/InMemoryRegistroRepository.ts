
import { registro } from "../domain/registro";
import { registroId } from "../domain/registroId";
import { registroDevolucion } from "../domain/registroDevolucion";
import { registroIdEstudiante } from "../domain/registroIdEstudiante";
import { registroEstado } from "../domain/registroEstado";
import { registroPrestamo } from "../domain/registroPrestamo";
import { registroCreateAt } from "../domain/registroCreateAt";
import { registroUpdateAt } from "../domain/registroUpdateAt";
import { RegistroRepository} from "../domain/registroRepository";
import { registroModel } from "./modelRegistro";
import { registroIdLibro } from "../domain/registroIdLibro";


export class InMemoryRegistroRepository implements RegistroRepository {
  async create(reg: registro): Promise<void> {
    const primitive = reg.mapToPrimitives();
    await registroModel.create({
      ...primitive,
      updateAt: reg.updateAt.value,
    });
  }

  async getAll(): Promise<registro[]> {
    const docs = await registroModel.find().lean();
    return docs.map(
      (d:any) =>
        new registro(
          new registroId(d.id),
          new registroPrestamo(d.prestamoDate),
          new registroDevolucion(d.registroDevolucion),
          new registroEstado(d.estado),
          new registroIdLibro(d.idLibro),
          new registroIdEstudiante(d.idEstudiante),
          new registroCreateAt(d.createdAt),
          new registroUpdateAt(d.updateAt)

        )   
    );
  }

  async getOneById(id: registroId): Promise<registro | null> {
    const d = await registroModel.findOne({ id: id.value }).lean();
    if (!d) return null;

    return new registro(
          new registroId(d.id),
          new registroPrestamo(d.prestamoDate),
          new registroDevolucion(d.devolucionDate),
          new registroEstado(d.estado),
          new registroIdLibro(d.idLibro),
          new registroIdEstudiante(d.idEstudiante),
          new registroCreateAt(d.createdAt),
          new registroUpdateAt(d.updateAt)
    );
  }

  async edit(lib: registro): Promise<void> {
    await registroModel.updateOne(
      { id: lib.id.value },
      {
        $set: {
          prestamoDate: lib.prestamoDate.value,
          devolucionDate: lib.devolucionDate.value,
          estado: lib.estado.value,
          idLibro: lib.idLibro.value,
          idEstudiante:lib.idEstudiante.value,
          createdAt: lib.createdAt.value,
          updateAt: lib.updateAt.value

        },
      }
    );
  }

  async delete(id: registroId): Promise<void> {
    await registroModel.deleteOne({ id: id.value });
  }
}