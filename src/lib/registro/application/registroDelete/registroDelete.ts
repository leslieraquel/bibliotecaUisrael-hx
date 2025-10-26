import { registroId } from "../../domain/registroId";
import { RegistroRepository } from "../../domain/registroRepository";

export class RegistroDelete {
    
    constructor(private repository: RegistroRepository) {}
    async run(id: string): Promise<void> {
        await this.repository.delete(new registroId(id));
    }
}