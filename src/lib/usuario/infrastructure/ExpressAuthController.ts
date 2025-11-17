import { NextFunction, Request, Response } from "express";
import { UserContainer } from "../../shared/infrastructure/ServiceContainerUser"; // ← Corregir import
import { UserToken } from "../domain/UserToken"; // ← Agregar este imp

export class ExpressAuthController {
    
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { ci, password } = req.body as {
                ci: string;
                password: string;
            };
            console.log(req.body);

            // Usar UserLogin para crear la sesión
            const session = await UserContainer.user.login.run(ci, password); // ← Cambiar UserContainer por UserServices
            
            return res.status(200).json({
                token: session.token,        // ← Token JWT
                user: session.user,          // ← Datos del usuario (sin password)
                expiresAt: session.expiresAt // ← Fecha de expiración
            });

        } catch (error) {
            if (error instanceof Error) {
                return res.status(401).json({ message: error.message });
            }
            next(error);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            return res.status(200).json({ message: 'Logout exitoso' });
        } catch (error) {
            next(error);
        }
    }

    async verifyToken(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers.authorization?.replace('Bearer ', '');
            
            if (!token) {
                return res.status(401).json({ valid: false });
            }
            
            const payload = UserToken.verify(token); // ← Ahora UserToken está importado
            return res.status(200).json({ valid: true, user: payload });
            
        } catch (error) {
            return res.status(401).json({ valid: false });
        }
    }
}