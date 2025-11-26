import { registro } from "../../domain/registro";
import { registroCreateAt } from "../../domain/registroCreateAt";
import { registroDevolucion } from "../../domain/registroDevolucion";
import { registroEstado } from "../../domain/registroEstado";
import { registroId } from "../../domain/registroId";
import { registroIdEstudiante } from "../../domain/registroIdEstudiante";
import { registroIdLibro } from "../../domain/registroIdLibro";
import { registroUpdateAt } from "../../domain/registroUpdateAt";
import { registroPrestamo } from "../../domain/registroPrestamo";
import { RegistroRepository } from "../../domain/registroRepository";



export class RegistroCreate {
    
    constructor(private repository: RegistroRepository) {}
    async run(
        // id: string,
        prestamoDate: Date,
        devolucionDate: Date,
        estado: string,
        idLibro:string,
        idEstudiante:string,
        createdAt: Date,
        updateAt: Date,

    ): Promise<void> {
        
        const registroEntity = new registro(
            null,
            new registroPrestamo(prestamoDate),
            new registroDevolucion(devolucionDate),
            new registroEstado(estado),
            new registroIdLibro(idLibro),
            new registroIdEstudiante(idEstudiante),
            new registroCreateAt(createdAt),
            new registroUpdateAt(updateAt)
        );


        // 2. Usar el repositorio inyectado para persistir la entidad
        return this.repository.create(registroEntity);
    }
}