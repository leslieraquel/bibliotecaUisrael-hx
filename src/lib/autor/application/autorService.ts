// Se puede manejarlo por servicios con el riesgo de incorporar dependencia entre funciones
import { autor } from "../domain/autor";
import { AutorRepository } from "../domain/autorRepository";

export class AutorService {
    constructor(private readonly repository: AutorRepository) {}
    
    // Delega la creación de la entidad al repositorio
    create(autor: autor): Promise<void> {
        return this.repository.create(autor);
    }
    
}