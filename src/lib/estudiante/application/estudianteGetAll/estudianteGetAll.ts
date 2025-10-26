import { estudiante } from "../../domain/estudiante";
import { estudianteRepository } from "../../domain/estudianteRepository";

export class estudianteGetAll{
    constructor(private repository:estudianteRepository){}
    async run(): Promise<estudiante[]>{
        return this.repository.getAll();
    }
}