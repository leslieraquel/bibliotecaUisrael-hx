import { User } from "./User";
import { UserCi } from "./UserCi";
export interface UserRepository{
    create (user: User): Promise<void>;
    getAll(): Promise<User[]>;
    getOneById(ci: UserCi):Promise<User | null>;
    edit(user: User):Promise<void>;
    delete(ci:UserCi): Promise<void>;
}