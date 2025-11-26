import { libro } from "./libro"; 
import { libroId } from "./libroId"; 
export interface LibroRepository {
    
    create(libro: libro): Promise<void>;
    getAll(): Promise<libro[]>;
    // getOneById(id: libroId): Promise<libro | null>;
    searchByMongoId(id: string): Promise<libro | null>;
    edit(libro: libro): Promise<void>;
    delete(id: libroId): Promise<void>;
    findByIds(ids: string[]): Promise<libro[]>;
    findNotInIds(ids: string[]): Promise<libro[]>;
}