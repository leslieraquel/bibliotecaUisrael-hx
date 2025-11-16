import { UserCi } from "./UserCi";
import { UserName } from "./UserName";
import { UserEmail } from "./UserEmail";
import { UserPassword } from "./UserPassword";
import { UserCreatedAt } from "./UserCreatedAt";
import { UserUpdateAt } from "./UserUpdateAt";

export class User {
    ci:UserCi;
    name :UserName;
    email:UserEmail;
    password:UserPassword;
    createdAt: UserCreatedAt;
    updateAt:UserUpdateAt;

    constructor(ci:UserCi, name:UserName, email:UserEmail, password: UserPassword,createdAt:UserCreatedAt, updateAt:UserUpdateAt){
        this.ci = ci;
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt ;
        this.updateAt = updateAt;
    }

    public nameAndEmail(): string {
        return `${this.name.value} - ${this.email.value}`;
    }

    public mapToPrimitives() {
        return {

            ci:this.ci.value,
            name: this.name.value,
            email :this.email.value,
            password: this.password,
            createdAt: this.createdAt.value,
            updateAt: this.updateAt.value,
        };
    }
}