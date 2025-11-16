import { User } from "../../domain/User";
import { UserCi } from "../../domain/UserCi";
import { UserRepository } from "../../domain/UserRepository";
import { UserNotFoundError } from "../../domain/UserNotFoundError";

export class UserGetOneById{
    constructor(private repository: UserRepository){}
    async run(ci: string): Promise<User>{
        const user = await this.repository.getOneById(new UserCi(ci));
        if(!user)throw new UserNotFoundError('Usuario no encontrado');
        return user;
    }
}