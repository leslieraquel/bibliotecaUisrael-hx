import { autor } from "./autor"; 
import { autorId } from "./autorId"; 
export interface AutorRepository {

    create(autor: autor): Promise<void>;
    getAll(): Promise<autor[]>;
    //getOneById(id: autorId): Promise<autor | null>;
    searchByMongoId(id: string): Promise<autor | null>;
    edit(autor: autor): Promise<void>;
    delete(id: autorId): Promise<void>;
}