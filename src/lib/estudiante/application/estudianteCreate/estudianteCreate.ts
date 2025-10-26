import { estudiante } from "../../domain/estudiante";
import { estudianteCreatedAt } from "../../domain/estudianteCreateAt";
import { estudianteUpdateAt } from "../../domain/estudianteUpdateAt";
import { estudianteCorreo } from "../../domain/estudianteCorreo";
import { estudianteId } from "../../domain/estudianteId";
import { estudianteName } from "../../domain/estudianteNombre";
import { estudianteCarrera } from "../../domain/estudianteCarer";

import { estudianteRepository } from "../../domain/estudianteRepository";

export class estudianteCreate{
    constructor(private repository: estudianteRepository){}
    async run(id:string, name:string, email:string, createdAt:Date,carrera:string): Promise<void>{
        const estudiante_ = new estudiante(
            new estudianteId(id),
            new estudianteName(name),
            new estudianteCorreo(email),
            new estudianteCreatedAt(createdAt),
            new estudianteCarrera(carrera)
        );
        return this.repository.create(estudiante_);
    }   
}