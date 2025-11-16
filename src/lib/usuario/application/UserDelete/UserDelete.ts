import { promises } from "dns";
import { User } from "../../domain/User";
import { UserCi } from "../../domain/UserCi";
import { UserRepository } from "../../domain/UserRepository";

export class  UserDelete{
    constructor(private repository :UserRepository){}
    async run(ci:string):Promise<void>{
        await this.repository.delete(new UserCi(ci));
    }
}

