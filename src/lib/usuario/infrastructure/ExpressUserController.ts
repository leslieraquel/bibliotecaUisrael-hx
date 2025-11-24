import { NextFunction, Request, Response } from "express";
import { UserContainer } from "../../shared/infrastructure/ServiceContainerUser";
import { UserNotFoundError } from "../domain/UserNotFoundError";


export class ExpressUserController {
    
    // GET /users
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await UserContainer.user.getAll.run();
            return res.status(200).json(users.map((user) => user.mapToPrimitives()));
        } catch (error) {
            next(error);
        }
    }

    // GET /users/:ci
    async getOneById(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await UserContainer.user.getOneById.run(req.params.ci);
            return res.status(200).json(user.mapToPrimitives());
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return res.status(404).json({ message: error.message });
            }
            next(error);
        }
    }

    // POST /users
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { ci, type , typeperfil, name, email, password, createdAt, updatedAt } = req.body as {
                ci: string;
                type:string;
                typeperfil:string;
                name: string;
                email: string;
                password: string;
                createdAt: string;
                updatedAt: string;
            };

            await UserContainer.user.create.run(
                ci,
                type,
                typeperfil,
                name,
                email,
                password,
                new Date(createdAt),
                new Date(updatedAt)
            );

            return res.status(201).json({ ci,type,typeperfil, name, email, createdAt, updatedAt });

        } catch (error) {
        // ✅ Manejo completo de errores de validación
        if (error instanceof Error) {
            const message = error.message;
            
            // Errores de cédula
            if (message.includes("cédula") && message.includes("registrada")) {
                return res.status(409).json({ message });
            }
            if (message.includes("cédula") && message.includes("dígitos")) {
                return res.status(400).json({ message });
            }
            
            // Error de contraseña
            if (message.includes("contraseña") && message.includes("caracteres")) {
                return res.status(400).json({ message });
            }
            
            // Error de email
            if (message.includes("email") || message.includes("correo")) {
                return res.status(400).json({ message });
            }
            
            // Error de nombre
            if (message.includes("nombre")) {
                return res.status(400).json({ message });
            }
        }
        
        // Para cualquier otro error
        next(error);
    }
}

    // PUT/PATCH /users/:ci
    async edit(req: Request, res: Response, next: NextFunction) {
        try {
            const { ci, type,typeperfil, name, email, password, createdAt, updatedAt } = req.body as {
                ci: string;
                type :string;
                typeperfil:string;
                name: string;
                email: string;
                password: string;
                createdAt: string;
                updatedAt: string;
            };
            
            await UserContainer.user.edit.run(
                ci,
                type,
                typeperfil,
                name,
                email,
                password,
                new Date(createdAt),
                new Date(updatedAt)
            );

            return res.status(200).json({ ci,type,typeperfil, name, email, createdAt, updatedAt });//aquitypeytyperfil

        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return res.status(404).json({ message: error.message });
            }
            next(error);
        }
    }

    // DELETE /users/:ci
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const ciToDelete = req.params.ci;
            
            await UserContainer.user.delete.run(ciToDelete);
            
            return res.status(200).json({ 
                message: `User con CI ${ciToDelete} eliminado exitosamente.` 
            });
            
        } catch (error) {
            next(error);
        }
    }

 ////duplicar cedula validacion
    async checkCi(req: Request, res: Response, next: NextFunction) {
    try {
        const { ci } = req.params;
        
        // Verificar formato primero
        if (!/^\d{10}$/.test(ci)) {
            return res.status(400).json({ 
                exists: false, 
                error: 'Formato de cédula inválido' 
            });
        }

        try {
            const user = await UserContainer.user.getOneById.run(ci);
            return res.status(200).json({ exists: true });
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return res.status(200).json({ exists: false });
            }
            throw error;
        }
    } catch (error) {
        next(error);
    }
}
}