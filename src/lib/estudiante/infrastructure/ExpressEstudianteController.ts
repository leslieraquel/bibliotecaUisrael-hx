import { NextFunction, Request, Response } from "express";
import { ServiceContainer } from "../../shared/infrastructure/ServiceContainerAuto";
import { estudianteNotFoundError } from "../domain/estudianteNotFoundError"; 

export class ExpressEstudianteController {
    
    // GET /estudiantes
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const estudiantes = await ServiceContainer.estudiante.getAll.run();
            return res.status(200).json(estudiantes.map((est) => est.mapToPrimitives()));
        } catch (error) {
            next(error);
        }
    }

    // GET /estudiantes/:id
    async getOneById(req: Request, res: Response, next: NextFunction) {
        try {
            const estudiante = await ServiceContainer.estudiante.getOneById.run(req.params.id);
            return res.status(200).json(estudiante.mapToPrimitives());
        } catch (error) {
            if (error instanceof estudianteNotFoundError) {
                return res.status(404).json({ message: error.message });
            }
            next(error);
        }
    }

    // POST /estudiantes
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, name, email, carrera, createdAt, updateAt } = req.body as {
                id: string;
                name: string;
                email: string;
                carrera: string;
                createdAt: string;
                updateAt: string;
            };

            await ServiceContainer.estudiante.create.run(
                id,
                name,
                email,
                carrera,
                new Date(createdAt),
                new Date(updateAt)
            );

            return res.status(201).json({ id, name, email, carrera, createdAt, updateAt });

        } catch (error) {
            next(error);
        }
    }

    // PUT/PATCH /estudiantes/:id
    async edit(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, name, email, carrera, createdAt, updateAt } = req.body as {
                id: string;
                name: string;
                email: string;
                carrera: string;
                createdAt: string;
                updateAt: string;
            };
            
            await ServiceContainer.estudiante.edit.run(
                id,
                name,
                email,
                carrera,
                new Date(createdAt),
                new Date(updateAt)
            );

            return res.status(200).json({ id, name, email, carrera, createdAt, updateAt });

        } catch (error) {
            if (error instanceof estudianteNotFoundError) {
                return res.status(404).json({ message: error.message });
            }
            next(error);
        }
    }

    // DELETE /estudiantes/:id
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const idToDelete = req.params.id;
            
            await ServiceContainer.estudiante.delete.run(idToDelete);
            
            return res.status(200).json({ 
                message: `Estudiante con ID ${idToDelete} eliminado exitosamente.` 
            });
            
        } catch (error) {
            next(error);
        }
    }
}