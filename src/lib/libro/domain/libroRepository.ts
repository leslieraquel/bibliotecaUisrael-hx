import { libro } from "./libro"; 
import { libroId } from "./libroId"; 
export interface LibroRepository {
    
    create(libro: libro): Promise<void>;
    getAll(): Promise<libro[]>;
    getOneById(id: libroId): Promise<libro | null>;
    edit(libro: libro): Promise<void>;
    delete(id: libroId): Promise<void>;
}