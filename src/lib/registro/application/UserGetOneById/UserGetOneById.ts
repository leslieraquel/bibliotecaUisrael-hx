import { registro } from "../../domain/registro";
import { registroId } from "../../domain/registroId";
import { RegistroRepository } from "../../domain/registroRepository";
import { registroNotFoundError } from "../../domain/registroNotFoundError"; 

export class RegistroGetOneById {
    
    constructor(private repository: RegistroRepository) {}
    async run(id: string): Promise<registro> {
        const registroEntity = await this.repository.getOneById(new registroId(id));

        if (!registroEntity) {
            throw new registroNotFoundError(`Registro con ID ${id} no encontrado`);
        }
        
        return registroEntity;
    }
}