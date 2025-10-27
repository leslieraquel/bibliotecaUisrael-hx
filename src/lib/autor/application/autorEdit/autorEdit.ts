import { autor } from "../../domain/autor";
import { autorBio } from "../../domain/autorBio";
import { autorCreatedAt } from "../../domain/autorCreatedAt";
import { autorId } from "../../domain/autorId";
import { autorNombre } from "../../domain/autorNombre";
import { autorUpdateAt } from "../../domain/autorUpdateAt";
import { AutorRepository } from "../../domain/autorRepository";
export class AutorEdit {
    
    constructor(private repository: AutorRepository) {}
    async run(
        id: string,
        name: string,
        bio: string,
        createdAt: Date,
        updateAt: Date 
    ): Promise<void> {
        const autorEntity = new autor(
            new autorId(id),
            new autorNombre(name),
            new autorBio(bio),
            new autorCreatedAt(createdAt),
            new autorUpdateAt(updateAt)
        );

        return this.repository.edit(autorEntity);
    }
}