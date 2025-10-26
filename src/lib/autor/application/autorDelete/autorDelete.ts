import { autorId } from "../../domain/autorId";
import { AutorRepository } from "../../domain/autorRepository";

export class AutorDelete {
    
    constructor(private repository: AutorRepository) {}
    async run(id: string): Promise<void> {
        await this.repository.delete(new autorId(id));
    }
}