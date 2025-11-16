import { User } from "../../domain/User";
import { UserCreatedAt } from "../../domain/UserCreatedAt";
import { UserCi } from "../../domain/UserCi";
import { UserName } from "../../domain/UserName";
import { UserEmail } from "../../domain/UserEmail";
import { UserPassword } from "../../domain/UserPassword";
import { UserRepository } from "../../domain/UserRepository";
import { UserUpdateAt } from "../../domain/UserUpdateAt";

export class UserCreate{
    constructor (private repository :UserRepository){}
    async run(ci:string, name:string, email:string, password:string, createdAt:Date, createUpdate:Date): Promise<void>
    {
        const user = new User(
            new UserCi(ci),
            new UserName(name),
            new UserEmail(email),
            new UserPassword (password),
            new UserCreatedAt(createdAt),
            new UserUpdateAt(createUpdate)
        );
        return this.repository.create(user);
    }

}