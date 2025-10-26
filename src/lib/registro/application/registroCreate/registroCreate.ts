import { registro } from "../../domain/registro";
import { registroCreateAt } from "../../domain/registroCreateAt";
import { registroDevolucion } from "../../domain/registroDevolucion";
import { registroEstado } from "../../domain/registroEstado";
import { registroId } from "../../domain/registroId";
import { registroPrestamo } from "../../domain/registroPrestamo";
import { RegistroRepository } from "../../domain/registroRepository";

export class RegistroCreate {
    
    constructor(private repository: RegistroRepository) {}
    async run(
        id: string,
        prestamoDate: Date,
        devolucionDate: Date,
        estado: string,
        createdAt: Date
    ): Promise<void> {
        
        const registroEntity = new registro(
            new registroId(id),
            new registroPrestamo(prestamoDate),
            new registroDevolucion(devolucionDate),
            new registroEstado(estado),
            new registroCreateAt(createdAt)
        );

        // 2. Usar el repositorio inyectado para persistir la entidad
        return this.repository.create(registroEntity);
    }
}