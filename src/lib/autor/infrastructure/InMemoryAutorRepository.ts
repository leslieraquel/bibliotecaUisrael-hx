import { autor } from "../domain/autor";
import { autorId } from "../domain/autorId";
import { AutorRepository } from "../domain/autorRepository";

export class InMemoryAutorRepository implements AutorRepository {
    // Almacena las entidades Autor en un array
    private autores: autor[] = [];
    
    async create(autor: autor): Promise<void> {
        this.autores.push(autor);
    }
    
    async getAll(): Promise<autor[]> {
        return this.autores;
    }
    
    async getOneById(id: autorId): Promise<autor | null> {
        // Busca el autor cuyo 'id.value' coincida con el 'id.value' buscado
        return this.autores.find((a) => a.id.value === id.value) || null;
    }
    
    async edit(autor: autor): Promise<void> {
        // Encuentra el índice del autor a editar
        const index = this.autores.findIndex((a) => a.id.value === autor.id.value);
        if (index !== -1) {
             // Reemplaza el autor existente con la nueva entidad
            this.autores[index] = autor;
        }
    }
    
    async delete(id: autorId): Promise<void> {
        // Filtra el array, eliminando el autor cuyo ID coincida
        this.autores = this.autores.filter((autor) => autor.id.value !== id.value);
    }
}