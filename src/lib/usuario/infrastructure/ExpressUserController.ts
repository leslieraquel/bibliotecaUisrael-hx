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
            const { ci, name, email, password, createdAt, updatedAt } = req.body as {
                ci: string;
                name: string;
                email: string;
                password: string;
                createdAt: string;
                updatedAt: string;
            };

            await UserContainer.user.create.run(
                ci,
                name,
                email,
                password,
                new Date(createdAt),
                new Date(updatedAt)
            );

            return res.status(201).json({ ci, name, email, createdAt, updatedAt });

        } catch (error) {
            next(error);
        }
    }

    // PUT/PATCH /users/:ci
    async edit(req: Request, res: Response, next: NextFunction) {
        try {
            const { ci, name, email, password, createdAt, updatedAt } = req.body as {
                ci: string;
                name: string;
                email: string;
                password: string;
                createdAt: string;
                updatedAt: string;
            };
            
            await UserContainer.user.edit.run(
                ci,
                name,
                email,
                password,
                new Date(createdAt),
                new Date(updatedAt)
            );

            return res.status(200).json({ ci, name, email, createdAt, updatedAt });

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
}