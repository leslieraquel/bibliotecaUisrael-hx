import { UserGetAll } from "../../usuario/application/UserGetAll/UserGetAll";
import { UserGetOneById } from "../../usuario/application/UserGetOneById/UserGetOneById";
import { UserCreate } from "../../usuario/application/UserCreate/UserCreate";
import { UserEdit } from "../../usuario/application/UserEdit/UserEdit";
import { UserDelete } from "../../usuario/application/UserDelete/UserDelete";
import { InMemoryUserRepository } from "../../usuario/infrastructure/InMemoryUserRepository";
import { UserLogin } from "../../usuario/application/UserLogin/UserLogin";
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