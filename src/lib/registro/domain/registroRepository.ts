import { registro } from "./registro"; 
import { registroId } from "./registroId"; 

export interface RegistroRepository {
    create(registro: registro): Promise<void>;
    getAll(): Promise<registro[]>;
    getOneById(id: registroId): Promise<registro | null>;
    edit(registro: registro): Promise<void>;
    delete(id: registroId): Promise<void>;
}