import { autorId } from "./autorId";
import { autorNombre } from "./autorNombre";
import { autorBio } from "./autorBio";
import { autorCreatedAt } from "./autorCreatedAt";
import { autorUpdateAt } from "./autorUpdateAt";

// Note: The structure suggests 'autor.ts' is inside the 'domain' folder.

export class autor {
     id: autorId | null;
    name: autorNombre;
    bio: autorBio;
    createdAt: autorCreatedAt;
    updateAt: autorUpdateAt;
    
    constructor(
 id: autorId | null, 
        name: autorNombre,
        bio: autorBio,
        createdAt: autorCreatedAt,
        updateAt: autorUpdateAt
    
    ) {
        this.id =id;
        this.name = name;
        this.bio = bio;
        this.createdAt = createdAt;
        this.updateAt = updateAt;
    }

       // AGREGAR ESTE MÉTODO PARA ACTUALIZAR EL ID
    public updateId(newId: autorId): void {
        this.id = newId;
    }
    public nameAndBio(): string {
        return `${this.name.value} - ${this.bio.value}`;
    }

    public mapToPrimitives() {
        return {
        id: this.id?.value ?? null,
            name: this.name.value,
            bio: this.bio.value,
            createdAt: this.createdAt.value,
            updateAt: this.updateAt.value,
        };
    }
}
