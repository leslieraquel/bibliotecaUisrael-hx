//Se puede manejarlo por servicios con el riesgo de incorporar dependencia entre funciones
import {User} from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export class UserService {
    constructor(private readonly repository: UserRepository){}
    create(user:User): Promise<void>{
        return this.repository.create(user);
    }
}