import { registro } from "../../domain/registro";
import { registroCreateAt } from "../../domain/registroCreateAt";
import { registroDevolucion } from "../../domain/registroDevolucion";
import { registroEstado } from "../../domain/registroEstado";
import { registroId } from "../../domain/registroId";
import { registroIdLibro } from "../../domain/registroIdLibro";
import { registroIdEstudiante } from "../../domain/registroIdEstudiante";
import { registroUpdateAt } from "../../domain/registroUpdateAt";
import { registroPrestamo } from "../../domain/registroPrestamo";
import { RegistroRepository } from "../../domain/registroRepository";



export class RegistroEdit {
    
    constructor(private repository: RegistroRepository) {}
    async run(
         id: string,
        prestamoDate: Date,
        devolucionDate: Date,
        estado: string,
        idLibro:string,
        idEstudiante:string,
        createdAt: Date,
        updateAt: Date,
    ): Promise<void> {
        // Reconstruye la Entidad Registro con los nuevos Objetos de Valor
        const registroEntity = new registro(
            new registroId(id),
            new registroPrestamo(prestamoDate),
            new registroDevolucion(devolucionDate),
            new registroEstado(estado),
            new registroIdLibro(idLibro),
            new registroIdEstudiante(idEstudiante),
            new registroCreateAt(createdAt),
            new registroUpdateAt(updateAt)
            
        );

        return this.repository.edit(registroEntity);
    }
}