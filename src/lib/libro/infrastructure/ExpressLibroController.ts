import { NextFunction, Request, Response } from "express";
import { LibroServices } from "../../shared/infrastructure/ServiceContainerLibro"; 
import { libroNotFoundError } from "../domain/libroNotFoundError"; 

export class ExpressLibroController {
    
    // GET /libros
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const libros = await LibroServices.getAll.run(); 
            return res.status(200).json(libros.map((libro) => libro.mapToPrimitives())); 
        } catch (error) {
            next(error);
        }
    }

    // GET /libros/:id
    async getOneById(req: Request, res: Response, next: NextFunction) {
        try {
            const libro = await LibroServices.getOneById.run(req.params.id); 
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
                year: string;
                createdAt: string;
                updateAt: string;
            };

            await LibroServices.create.run( 
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

    // PUT/PATCH /libros/:id
    async edit(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, title, isbn, editorial, year, createdAt, updateAt } = req.body as {
                id: string;
                title: string;
                isbn: string;
                editorial: string;
                year: string;
                createdAt: string;
                updateAt: string;
            };
            
            await LibroServices.edit.run(
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

    // DELETE /libros/:id
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const idToDelete = req.params.id;
            
            await LibroServices.delete.run(idToDelete);
            
            return res.status(200).json({ 
                message: `Libro con ID ${idToDelete} eliminado exitosamente.` 
            });
            
        } catch (error) {
            next(error);
        }
    }
}