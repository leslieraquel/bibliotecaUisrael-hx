import { registro } from "../domain/registro";
import { registroId } from "../domain/registroId";
import { RegistroRepository } from "../domain/registroRepository";

export class InMemoryRegistroRepository implements RegistroRepository {
    private registros: registro[] = [];
    
    async create(registro: registro): Promise<void> {
        this.registros.push(registro);
    }
    
    async getAll(): Promise<registro[]> {
        return this.registros;
    }
    
    async getOneById(id: registroId): Promise<registro | null> {
        return this.registros.find((r) => r.id.value === id.value) || null;
    }
    
    async edit(registro: registro): Promise<void> {
        const index = this.registros.findIndex((r) => r.id.value === registro.id.value);
        if (index !== -1) {
            this.registros[index] = registro;
        }
    }
    
    async delete(id: registroId): Promise<void> {
        this.registros = this.registros.filter((registro) => registro.id.value !== id.value);
    }
}