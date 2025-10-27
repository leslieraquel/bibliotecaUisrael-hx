import { NextFunction, Request, Response } from "express";
// 💡 Importamos directamente el objeto de servicios modular (asumiendo esta ruta)
import { LibroServices } from "../../shared/infrastructure/LibroContainer"; 
import { libroNotFoundError } from "../domain/libroNotFoundError"; 

export class ExpressLibroController {
    
    // GET /libros
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            // Acceso directo a LibroServices.getAll.run()
            const libros = await LibroServices.getAll.run(); 
            // Mapea cada entidad Libro a su versión primitiva antes de enviar el JSON
            return res.status(200).json(libros.map((libro) => libro.mapToPrimitives()));
        } catch (error) {
            next(error);
        }
    }

    // GET /libros/:id
    async getOneById(req: Request, res: Response, next: NextFunction) {
        try {
            // Acceso directo a LibroServices.getOneById.run()
            const libro = await LibroServices.getOneById.run(req.params.id); 
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

            // Acceso directo a LibroServices.create.run()
            await LibroServices.create.run( 
                id,
                title,
                isbn,
                editorial,
                year,
                new Date(createdAt),
                new Date(updateAt)
            );

            // Devuelve 201 Created y el objeto creado
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
                year: number;
                createdAt: string;
                updateAt: string;
            };
            
            // Acceso directo a LibroServices.edit.run()
            await LibroServices.edit.run(
                id,
                title,
                isbn,
                editorial,
                year,
                new Date(createdAt),
                new Date(updateAt)
            );

            // Devuelve 200 OK y el objeto actualizado
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
            
            // Acceso directo a LibroServices.delete.run()
            await LibroServices.delete.run(idToDelete);
            
            // Devuelve 200 OK y un mensaje de éxito
            return res.status(200).json({ 
                message: `Libro con ID ${idToDelete} eliminado exitosamente.` 
            });
            
        } catch (error) {
            next(error);
        }
    }
}