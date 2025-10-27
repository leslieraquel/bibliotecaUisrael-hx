import { NextFunction, Request, Response } from "express";
import { ServiceContainer } from "../../Shared/infrastructure/ServiceContainer";
import { libroNotFoundError } from "../domain/libroNotFoundError"; 

export class ExpressLibroController {
    
    // GET /libros
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const libros = await ServiceContainer.libro.getAll.run();
            // Mapea cada entidad Libro a su versión primitiva antes de enviar el JSON
            return res.status(200).json(libros.map((libro) => libro.mapToPrimitives()));
        } catch (error) {
            next(error);
        }
    }

    // GET /libros/:id
    async getOneById(req: Request, res: Response, next: NextFunction) {
        try {
            const libro = await ServiceContainer.libro.getOneById.run(req.params.id);
            // Envía la entidad Libro encontrada (convertida a primitivos)
            return res.status(200).json(libro.mapToPrimitives());
        } catch (error) {
            if (error instanceof libroNotFoundError) {
                return res.status(404).json({ message: error.message });
            }
            next(error);
        }
    }

    // POST /libros
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, title, isbn, editorial, year, createdAt, updateAt } = req.body as {
                id: string;
                title: string;
                isbn: string;
                editorial: string;
                year: number;
                createdAt: string;
                updateAt: string;
            };

            await ServiceContainer.libro.create.run(
                id,
                title,
                isbn,
                editorial,
                year,
                new Date(createdAt),
                new Date(updateAt)
            );

            return res.status(201).json({ id, title, isbn, editorial, year, createdAt, updateAt });

        } catch (error) {
            next(error);
        }
    }

    async edit(req: Request, res: Response, next: NextFunction) {
        try {
             const { id, title, isbn, editorial, year, createdAt, updateAt } = req.body as {
                id: string;
                title: string;
                isbn: string;
                editorial: string;
                year: number;
                createdAt: string;
                updateAt: string;
            };
            
            await ServiceContainer.libro.edit.run(
                id,
                title,
                isbn,
                editorial,
                year,
                new Date(createdAt),
                new Date(updateAt)
            );
            return res.status(200).json({ id, title, isbn, editorial, year, createdAt, updateAt });

        } catch (error) {
            if (error instanceof libroNotFoundError) {
                return res.status(404).json({ message: error.message });
            }
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const idToDelete = req.params.id;
            
            await ServiceContainer.libro.delete.run(idToDelete);
            return res.status(200).json({ 
                message: `Libro con ID ${idToDelete} eliminado exitosamente.` 
            });
            
        } catch (error) {
            next(error);
        }
    }
}