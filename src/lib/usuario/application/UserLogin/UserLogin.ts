import { User } from "../../domain/User";
import { UserCi } from "../../domain/UserCi";
import { UserRepository } from "../../domain/UserRepository";
import { UserToken } from "../../domain/UserToken";
import { UserSession } from "../../domain/UserSession";

export class UserLogin {
    constructor(private repository: UserRepository) {}
    
    async run(ci: string, password: string): Promise<UserSession> {
        const userCi = new UserCi(ci);
        console.log(password);
        const user = await this.repository.getOneById(userCi);
        
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        if (!user.password.match(password)) {
            throw new Error('Contraseña incorrecta');
        }
        
        // Generar token con los datos del usuario
        const token = UserToken.generate({
            ci: user.ci.value,
            tipo: user.type.value,
            name: user.name.value,
            email: user.email.value
        });
        
        // Crear sesión con token y datos del usuario
        return new UserSession(
            token.value,
            {
                ci: user.ci.value,
                type: user.type.value,
                name: user.name.value,
                email: user.email.value
            },
            new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 horas
        );
    }
}