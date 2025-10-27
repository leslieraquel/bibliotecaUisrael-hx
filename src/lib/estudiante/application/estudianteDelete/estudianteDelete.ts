import { estudianteId } from "../../domain/estudianteId";
import { estudianteRepository } from "../../domain/estudianteRepository"; 

export class EstudianteDelete {
    
    constructor(private repository: estudianteRepository) {}
    async run(id: string): Promise<void> {
        await this.repository.delete(new estudianteId(id));
    }
}