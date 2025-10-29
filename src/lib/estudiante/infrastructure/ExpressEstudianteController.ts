import { NextFunction, Request, Response } from "express";
import { EstudianteServices  } from "../../shared/infrastructure/ServiceContainerEstudiante";
import { estudianteNotFoundError } from "../domain/estudianteNotFoundError"; 

export class ExpressEstudianteController {
    
    // GET /estudiantes
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const estudiantes = await EstudianteServices.estudiante.getAll.run();
            return res.status(200).json(estudiantes.map((estudiante) => estudiante.mapToPrimitives()));
        } catch (error) {
            next(error);
        }
    }

    // GET /estudiantes/:id
    async getOneById(req: Request, res: Response, next: NextFunction) {
        try {
            const estudiante = await EstudianteServices.estudiante.getOneById.run(req.params.id);
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
                createdAt: string;
                carrera: string;
                updateAt: string;
            };

            await EstudianteServices.estudiante.create.run(
                id,
                name,
                email,
                new Date(createdAt),
                carrera,
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
                createdAt: string;
                carrera: string;
                updateAt: string;
            };
            
            await EstudianteServices.estudiante.edit.run(
                id,
                name,
                email,
                new Date(createdAt),
                carrera,
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
            
            await EstudianteServices.estudiante.delete.run(idToDelete);
            
            return res.status(200).json({ 
                message: `Estudiante con ID ${idToDelete} eliminado exitosamente.` 
            });
            
        } catch (error) {
            next(error);
        }
    }
}