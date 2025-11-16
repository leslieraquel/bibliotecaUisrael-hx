import { UserGetAll } from "src/lib/usuario/application/UserGetAll/UserGetAll";
import { UserGetOneById } from "src/lib/usuario/application/UserGetOneById/UserGetOneById";
import { UserCreate } from "src/lib/usuario/application/UserCreate/UserCreate";
import { UserEdit } from "src/lib/usuario/application/UserEdit/UserEdit";
import { UserDelete } from "src/lib/usuario/application/UserDelete/UserDelete";
import { InMemoryUserRepository } from "src/lib/usuario/infrastructure/InMemoryUserRepository";
import { UserLogin } from "src/lib/usuario/application/UserLogin/UserLogin";
const UserRepository = new InMemoryUserRepository();

export const UserContainer = {
    user: {
        getAll: new UserGetAll(UserRepository),
        getOneById : new UserGetOneById(UserRepository),
        create: new UserCreate(UserRepository),
        edit: new UserEdit(UserRepository),
        delete: new UserDelete(UserRepository),
        login :new UserLogin(UserRepository)
    },
};