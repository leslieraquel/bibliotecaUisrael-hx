import { estudianteId } from "../../domain/estudianteId";
import { EstudianteRepository } from "../../domain/estudianteRepository"; 

export class EstudianteDelete {
    
    constructor(private repository: EstudianteRepository) {}
    async run(id: string): Promise<void> {
        await this.repository.delete(new estudianteId(id));
    }
}