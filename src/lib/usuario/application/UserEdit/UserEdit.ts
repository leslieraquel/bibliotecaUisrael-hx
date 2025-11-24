import { User } from "../../domain/User";
import { UserCreatedAt } from "../../domain/UserCreatedAt";
import { UserCi } from "../../domain/UserCi";
import { UserName } from "../../domain/UserName";
import { UserEmail } from "../../domain/UserEmail";
import { UserPassword } from "../../domain/UserPassword";
import { UserRepository } from "../../domain/UserRepository";
import { UserUpdateAt } from "../../domain/UserUpdateAt";
import { UserType } from "../../domain/UserType";
import { UserPerfil } from "../../domain/UserPerfil";

export class UserEdit{
    constructor (private repository :UserRepository){}
    async run(ci:string, type:string,typeperfil:string,  name:string, email:string, password:string, createdAt:Date, createUpdate:Date): Promise<void>
    {
        const user = new User(
            new UserCi(ci),
            new UserType(type),
            new UserPerfil(typeperfil),
            new UserName(name),
            new UserEmail(email),
            new UserPassword (password),
            new UserCreatedAt(createdAt),
            new UserUpdateAt(createUpdate)
        );
        return this.repository.edit(user);
    }

}