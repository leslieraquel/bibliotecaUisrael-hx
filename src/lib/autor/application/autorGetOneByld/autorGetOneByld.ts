import { autor } from "../../domain/autor";
import { autorId } from "../../domain/autorId";
import { AutorRepository } from "../../domain/autorRepository";
import { autorNotFoundError } from "../../domain/autorNotFoundError"; 

export class AutorGetOneById {
    constructor(private repository: AutorRepository) {}
    async run(id: string): Promise<autor> {
        const autorEntity = await this.repository.getOneById(new autorId(id));
        if (!autorEntity) {
            throw new autorNotFoundError(`Autor con ID ${id} no encontrado`);
        }
        
        return autorEntity;
    }
}