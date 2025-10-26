// Se puede manejarlo por servicios con el riesgo de incorporar dependencia entre funciones
import { libro } from "../domain/libro";
import { LibroRepository } from "../domain/libroRepository";

export class LibroService {
    constructor(private readonly repository: LibroRepository) {}
    
    // Delega la creación de la entidad al repositorio
    create(libro: libro): Promise<void> {
        return this.repository.create(libro);
    }
}