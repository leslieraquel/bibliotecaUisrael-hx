// Se puede manejarlo por servicios con el riesgo de incorporar dependencia entre funciones
import { registro } from "../domain/registro";
import { RegistroRepository } from "../domain/registroRepository";

export class RegistroService {
    constructor(private readonly repository: RegistroRepository) {}
    create(registro: registro): Promise<void> {
        return this.repository.create(registro);
    }
}