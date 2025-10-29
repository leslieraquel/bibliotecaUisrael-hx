import { InMemoryRegistroRepository } from "../../registro/infrastructure/InMemoryRegistroRepository";
// Corrección de Capitalización en la importación de la Clase
import { RegistroGetAll } from "../../registro/application/registroGetAll/registroGetAll"; 
import { RegistroGetOneById } from "../../registro/application/registroGetOneById/registroGetOneById";
import { RegistroCreate } from "../../registro/application/registroCreate/registroCreate";
import { RegistroEdit } from "../../registro/application/registroEdit/registroEdit";
import { RegistroDelete } from "../../registro/application/registroDelete/registroDelete";
import { registro } from "src/lib/registro/domain/registro";

const RegistroRepository = new InMemoryRegistroRepository();

export const RegistroServices = {
registro:{
    getAll: new RegistroGetAll(RegistroRepository),
    getOneById: new RegistroGetOneById(RegistroRepository),
    create: new RegistroCreate(RegistroRepository),
    edit: new RegistroEdit(RegistroRepository),
    delete: new RegistroDelete(RegistroRepository),
}
};