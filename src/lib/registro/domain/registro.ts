import { registroId } from "./registroId";
import { registroPrestamo } from "./registroPrestamo"; 
import { registroDevolucion } from "./registroDevolucion"; 
import { registroEstado } from "./registroEstado"; 
import { registroCreateAt } from "./registroCreateAt";

export class registro {

    id: registroId;
    prestamoDate: registroPrestamo; 
    devolucionDate: registroDevolucion; 
    estado: registroEstado; 
    createdAt: registroCreateAt; 

    constructor(
        id: registroId,
        prestamoDate: registroPrestamo,
        devolucionDate: registroDevolucion,
        estado: registroEstado,
        createdAt: registroCreateAt
    ) {
        this.id = id;
        this.prestamoDate = prestamoDate;
        this.devolucionDate = devolucionDate;
        this.estado = estado;
        this.createdAt = createdAt;
    }

    // Verifica si el registro está pendiente de devolución.
    public isPending(): boolean {
        return this.estado.value === 'PENDIENTE';
    }

    public mapToPrimitives() {
        return {
            id: this.id.value,
            prestamoDate: this.prestamoDate.value,
            devolucionDate: this.devolucionDate.value,
            estado: this.estado.value,
            createdAt: this.createdAt.value,
        };
    }

    public markAsReturned(returnedDate: registroDevolucion, newState: registroEstado): void {
        this.devolucionDate = returnedDate;
        this.estado = newState;
    }
}