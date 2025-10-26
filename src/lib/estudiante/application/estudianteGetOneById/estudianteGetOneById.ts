import { estudiante } from "../../domain/estudiante";
import { estudianteId } from "../../domain/estudianteId";
import { estudianteRepository } from "../../domain/estudianteRepository";
import { estudianteNotFoundError } from "../../domain/estudianteNotFoundError"; 

export class EstudianteGetOneById {
    
    constructor(private repository: estudianteRepository) {}

    async run(id: string): Promise<estudiante> {
        const estudianteEntity = await this.repository.getOneById(new estudianteId(id));

        if (!estudianteEntity) {
            throw new estudianteNotFoundError(`Estudiante con ID ${id} no encontrado`);
        }
        
        return estudianteEntity;
    }
}