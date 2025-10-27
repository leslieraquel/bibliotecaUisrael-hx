// import { InMemoryUserRepository } from "../../estudiante/infrastructure/InMemoryUserRepository";
// import {estudianteGetAll } from "../../estudiante/application/estudianteGetAll/estudianteGetAll";
// import {UserGetOneById} from "../../User/application/UserGetOneById/UserGetOneById";
// import { estudianteCreate} from "../../estudiante/application/estudianteCreate/estudianteCreate";
// import {UserEdit} from "../../User/application/UserEdit/UserEdit";
// import {UserDelete} from "../../User/application/UserDelete/UserDelete";
// const UserRepository = new InMemoryUserRepository();

// export const ServiceContainer = {
//     user: {
//         getAll: new estudianteGetAll(UserRepository),
//         getOneById : new UserGetOneById(UserRepository),
//         create: new estudianteCreate(UserRepository),
//         edit: new UserEdit(UserRepository),
//         delete: new UserDelete(UserRepository),
//     },
// };

// autorContainer.ts

import { InMemoryAutorRepository } from "../../autor/infrastructure/InMemoryAutorRepository";
import { AutorGetAll } from "../../autor/application/autorGetAll/autorGetAll";
import { AutorGetOneById } from "../../autor/application/autorGetOneByld/autorGetOneByld";
import { AutorCreate } from "../../autor/application/autorCreate/autorCreate";
import { AutorEdit } from "../../autor/application/autorEdit/autorEdit";
import { AutorDelete } from "../../autor/application/autorDelete/autorDelete";

// 1. Instanciar Repositorio
const AutorRepository = new InMemoryAutorRepository();

// 2. Definir y exportar los servicios para el dominio Autor
export const AutorServices = {
    getAll: new AutorGetAll(AutorRepository),
    getOneById: new AutorGetOneById(AutorRepository),
    create: new AutorCreate(AutorRepository),
    edit: new AutorEdit(AutorRepository),
    delete: new AutorDelete(AutorRepository),
};
