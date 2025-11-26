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
            const { ci, type, typeperfil, name, email, password, createdAt, updatedAt } = req.body as {
                ci: string;
                type: string;
                typeperfil: string;
                name: string;
                email: string;
                password: string;
                createdAt: string;
                updatedAt: string;
            };

            // Validación adicional de nombre duplicado
            const users = await UserContainer.user.getAll.run();
            const nombreExiste = users.some(user => 
                user.mapToPrimitives().name.toLowerCase() === name.toLowerCase().trim()
            );

            if (nombreExiste) {
                return res.status(409).json({ 
                    message: "El nombre ya está registrado en el sistema" 
                });
            }

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

            return res.status(201).json({ ci, type, typeperfil, name, email, createdAt, updatedAt });

        } catch (error) {
            // ✅ CAPTURAR ERROR DE MONGO DB DUPLICATE KEY
            if (error instanceof Error) {
                const message = error.message;
                
                // ERROR DE CÉDULA DUPLICADA EN MONGODB
                if (message.includes("E11000") || message.includes("duplicate key")) {
                    return res.status(409).json({ 
                        message: "La cédula ya está registrada en el sistema" 
                    });
                }
                
                // ERROR DE NOMBRE DUPLICADO EN MONGODB (si tienes índice único en nombre)
                if (message.includes("nombre") && message.includes("duplicado")) {
                    return res.status(409).json({ 
                        message: "El nombre ya está registrado en el sistema" 
                    });
                }
                
                // Errores de validación existentes
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
            console.error("Error completo en create:", error);
            next(error);
        }
    }

    // PUT/PATCH /users/:ci
    async edit(req: Request, res: Response, next: NextFunction) {
        try {
            const { ci, type, typeperfil, name, email, password, createdAt, updatedAt } = req.body as {
                ci: string;
                type: string;
                typeperfil: string;
                name: string;
                email: string;
                password: string;
                createdAt: string;
                updatedAt: string;
            };

            // Validación adicional de nombre duplicado en edición (excluyendo el usuario actual)
            const users = await UserContainer.user.getAll.run();
            const nombreExiste = users.some(user => {
                const userData = user.mapToPrimitives();
                return userData.name.toLowerCase() === name.toLowerCase().trim() && 
                       userData.ci !== req.params.ci; // Excluir el usuario actual
            });

            if (nombreExiste) {
                return res.status(409).json({ 
                    message: "El nombre ya está registrado en el sistema" 
                });
            }
            
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

            return res.status(200).json({ ci, type, typeperfil, name, email, createdAt, updatedAt });

        } catch (error) {
            // ✅ CAPTURAR ERROR DE MONGO DB DUPLICATE KEY EN EDIT TAMBIÉN
            if (error instanceof Error) {
                const message = error.message;
                
                // ERROR DE CÉDULA DUPLICADA EN MONGODB
                if (message.includes("E11000") || message.includes("duplicate key")) {
                    return res.status(409).json({ 
                        message: "La cédula ya está registrada en el sistema" 
                    });
                }

                // ERROR DE NOMBRE DUPLICADO EN MONGODB
                if (message.includes("nombre") && message.includes("duplicado")) {
                    return res.status(409).json({ 
                        message: "El nombre ya está registrado en el sistema" 
                    });
                }
            }
            
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

    // VALIDACIÓN DE CÉDULA ÚNICA
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

    // VALIDACIÓN DE NOMBRE ÚNICO
    async checkName(req: Request, res: Response, next: NextFunction) {
        try {
            const { name } = req.params;
            
            // Verificar formato del nombre
            if (!name || name.trim().length < 2) {
                return res.status(400).json({ 
                    exists: false, 
                    error: 'Nombre inválido' 
                });
            }

            try {
                const users = await UserContainer.user.getAll.run();
                const nameExists = users.some(user => 
                    user.mapToPrimitives().name.toLowerCase() === name.toLowerCase().trim()
                );
                
                return res.status(200).json({ exists: nameExists });
            } catch (error) {
                next(error);
            }
        } catch (error) {
            next(error);
        }
    }

    // VALIDACIÓN DE EMAIL ÚNICO (OPCIONAL - si quieres agregarlo)
    async checkEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.params;
            
            // Verificar formato del email
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                return res.status(400).json({ 
                    exists: false, 
                    error: 'Formato de email inválido' 
                });
            }

            try {
                const users = await UserContainer.user.getAll.run();
                const emailExists = users.some(user => 
                    user.mapToPrimitives().email.toLowerCase() === email.toLowerCase().trim()
                );
                
                return res.status(200).json({ exists: emailExists });
            } catch (error) {
                next(error);
            }
        } catch (error) {
            next(error);
        }
    }
}