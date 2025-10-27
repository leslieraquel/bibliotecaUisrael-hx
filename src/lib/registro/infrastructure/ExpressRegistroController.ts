import { NextFunction, Request, Response } from "express";
import { ServiceContainer } from "../../Shared/infrastructure/ServiceContainer";
import { registroNotFoundError } from "../domain/registroNotFoundError"; 

export class ExpressRegistroController {
    
    // GET /registros
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const registros = await ServiceContainer.registro.getAll.run();
            return res.status(200).json(registros.map((reg) => reg.mapToPrimitives()));
        } catch (error) {
            next(error);
        }
    }

    // GET /registros/:id
    async getOneById(req: Request, res: Response, next: NextFunction) {
        try {
            const registro = await ServiceContainer.registro.getOneById.run(req.params.id);
            return res.status(200).json(registro.mapToPrimitives());
        } catch (error) {
            if (error instanceof registroNotFoundError) {
                return res.status(404).json({ message: error.message });
            }
            next(error);
        }
    }

    // POST /registros
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, prestamoDate, devolucionDate, estado, createdAt } = req.body as {
                id: string;
                prestamoDate: string;
                devolucionDate: string;
                estado: string;
                createdAt: string;
            };

            await ServiceContainer.registro.create.run(
                id,
                new Date(prestamoDate),
                new Date(devolucionDate),
                estado,
                new Date(createdAt)
            );

            return res.status(201).json({ id, prestamoDate, devolucionDate, estado, createdAt });

        } catch (error) {
            next(error);
        }
    }

    // PUT/PATCH /registros/:id
    async edit(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, prestamoDate, devolucionDate, estado, createdAt } = req.body as {
                id: string;
                prestamoDate: string;
                devolucionDate: string;
                estado: string;
                createdAt: string;
            };
            
            await ServiceContainer.registro.edit.run(
                id,
                new Date(prestamoDate),
                new Date(devolucionDate),
                estado,
                new Date(createdAt)
            );

            return res.status(200).json({ id, prestamoDate, devolucionDate, estado, createdAt });

        } catch (error) {
            if (error instanceof registroNotFoundError) {
                return res.status(404).json({ message: error.message });
            }
            next(error);
        }
    }

    // DELETE /registros/:id
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const idToDelete = req.params.id;
            
            await ServiceContainer.registro.delete.run(idToDelete);
            
            return res.status(200).json({ 
                message: `Registro con ID ${idToDelete} eliminado exitosamente.` 
            });
            
        } catch (error) {
            next(error);
        }
    }
}