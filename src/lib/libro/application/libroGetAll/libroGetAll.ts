import { libro } from "../../domain/libro";
import { LibroRepository } from "../../domain/libroRepository";

export class LibroGetAll {
    constructor(private repository: LibroRepository) {}
    async run(): Promise<libro[]> {
        return this.repository.getAll();
    }
}