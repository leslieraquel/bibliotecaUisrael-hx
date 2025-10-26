import { libro } from "../domain/libro";
import { libroId } from "../domain/libroId";
import { LibroRepository } from "../domain/libroRepository";

export class InMemoryLibroRepository implements LibroRepository {
    private libros: libro[] = [];
    
    async create(libro: libro): Promise<void> {
        this.libros.push(libro);
    }
    
    async getAll(): Promise<libro[]> {
        return this.libros;
    }
    
    async getOneById(id: libroId): Promise<libro | null> {
        return this.libros.find((l) => l.id.value === id.value) || null;
    }
    
    async edit(libro: libro): Promise<void> {
        const index = this.libros.findIndex((l) => l.id.value === libro.id.value);
        if (index !== -1) {
            this.libros[index] = libro;
        }
    }
    
    async delete(id: libroId): Promise<void> {
        this.libros = this.libros.filter((libro) => libro.id.value !== id.value);
    }
}