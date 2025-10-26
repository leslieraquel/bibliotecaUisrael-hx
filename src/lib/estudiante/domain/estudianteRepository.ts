import { estudiante } from "./estudiante";
import { estudianteId } from "./estudianteId";

export interface estudianteRepository{
    create (estudiante: estudiante): Promise<void>;
    getAll(): Promise<estudiante[]>;
    getOneById(id: estudianteId):Promise<estudiante | null>;
    edit(estudiante: estudiante):Promise<void>;
    delete(id:estudianteId): Promise<void>;
}
