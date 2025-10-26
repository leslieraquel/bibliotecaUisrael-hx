import { autor } from "../../domain/autor";
import { AutorRepository } from "../../domain/autorRepository";

export class AutorGetAll {
    constructor(private repository: AutorRepository) {}
    async run(): Promise<autor[]> {
        return this.repository.getAll();
    }
}