import { registroId } from "./registroId";
import { registroPrestamo } from "./registroPrestamo"; 
import { registroDevolucion } from "./registroDevolucion"; 
import { registroEstado } from "./registroEstado"; 
import { registroCreateAt } from "./registroCreateAt";
import { registroUpdateAt } from "./registroUpdateAt";
import { registroIdLibro } from "./registroIdLibro";
import { registroIdEstudiante } from "./registroIdEstudiante";


export class registro {

    id: registroId;
    prestamoDate: registroPrestamo; 
    devolucionDate: registroDevolucion; 
    estado: registroEstado; 
    idLibro:registroIdLibro;
    idEstudiante:registroIdEstudiante;
    createdAt: registroCreateAt; 
    updateAt:registroUpdateAt;


    constructor(
    id: registroId,
    prestamoDate: registroPrestamo,
    devolucionDate: registroDevolucion,
    estado: registroEstado,
    idLibro: registroIdLibro,
    idEstudiante: registroIdEstudiante,
    createdAt: registroCreateAt,
    updateAt: registroUpdateAt
    ) {
        this.id = id;
        this.prestamoDate = prestamoDate;
        this.devolucionDate = devolucionDate;
        this.estado = estado;
        this.idLibro=idLibro;
        this.idEstudiante=idEstudiante;
        this.createdAt = createdAt;
        this.updateAt=updateAt
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
            idLibro:this.idLibro.value,
            idEstudiante:this.idEstudiante.value,
            createdAt: this.createdAt.value,
            updateAt:this.updateAt.value
        };
    }

    public markAsReturned(returnedDate: registroDevolucion, newState: registroEstado): void {
        this.devolucionDate = returnedDate;
        this.estado = newState;
    }
}


