import { libro } from "../../domain/libro";
import { LibroRepository } from "../../domain/libroRepository";
import { libroNotFoundError } from "../../domain/libroNotFoundError"; 

// export class LibroGetOneById {
    
//     constructor(private repository: LibroRepository) {}

//     async run(id: string): Promise<libro> {
//         const libroEntity = await this.repository.getOneById(new libroId(id));

//         if (!libroEntity) {
//             throw new libroNotFoundError(`Libro con ID ${id} no encontrado`);
//         }
        
//         return libroEntity;
//     }
// }

// export class LibroGetOneById {
//     constructor(private repository: LibroRepository) {}

//     async run(id: string): Promise<libro> {
//         return await this.repository.searchByMongoId(id);
//     }
// }