import { registro } from "../../domain/registro";
import { RegistroRepository } from "../../domain/registroRepository";
export class RegistroGetAll {
    
    constructor(private repository: RegistroRepository) {}
    async run(): Promise<registro[]> {
        return this.repository.getAll();
    }
}