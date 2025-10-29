import { InMemoryEstudianteRepository } from "../../estudiante/infrastructure/InMemoryEstudianteRepository";
import { estudianteGetAll } from "../../estudiante/application/estudianteGetAll/estudianteGetAll";
import { EstudianteGetOneById } from "../../estudiante/application/estudianteGetOneById/estudianteGetOneById";
import { estudianteCreate } from "../../estudiante/application/estudianteCreate/estudianteCreate";
import { estudianteEdit } from "../../estudiante/application/estudianteEdit/estudianteEdit";
import { EstudianteDelete } from "../../estudiante/application/estudianteDelete/estudianteDelete";

const EstudianteRepository = new InMemoryEstudianteRepository();
export const EstudianteServices = {

    estudiante:{
        getAll: new estudianteGetAll(EstudianteRepository),
        getOneById: new EstudianteGetOneById(EstudianteRepository),
        create: new estudianteCreate(EstudianteRepository),
        edit: new estudianteEdit(EstudianteRepository),
        delete: new EstudianteDelete(EstudianteRepository),

    }
    
};