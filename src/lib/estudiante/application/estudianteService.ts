// Se puede manejarlo por servicios con el riesgo de incorporar dependencia entre funciones
import { estudiante } from "../domain/estudiante";
import { estudianteRepository } from "../domain/estudianteRepository";

export class EstudianteService {
    constructor(private readonly repository: estudianteRepository) {}
    
    // Delega la creación de la entidad al repositorio
    create(estudiante: estudiante): Promise<void> {
        return this.repository.create(estudiante);
    }
}