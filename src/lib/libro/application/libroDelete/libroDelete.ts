import { libroId } from "../../domain/libroId";
import { LibroRepository } from "../../domain/libroRepository";

export class LibroDelete {
    constructor(private repository: LibroRepository) {}
    async run(id: string): Promise<void> {
        await this.repository.delete(new libroId(id));
    }
}