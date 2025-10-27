import { NextFunction, Request, Response } from "express";
import { ServiceContainerAutor } from "../../shared/infrastructure/ServiceContainerAutor"; 
import { autorNotFoundError } from "../domain/autorNotFoundError"; // Asume que el error de dominio es 'autorNotFoundError'

export class ExpressAutorController {

    // GET /autores
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            // Llama al caso de uso para obtener todos los autores
            const autores = await ServiceContainerAutor.autor.getAll.run();
            // Convierte cada entidad a primitivos antes de la respuesta JSON
            return res.status(200).json(autores.map((autor) => autor.mapToPrimitives()));
        } catch (error) {
            next(error);
        }
    }

    // GET /autores/:id
    async getOneById(req: Request, res: Response, next: NextFunction) {
        try {
            // Llama al caso de uso para obtener un autor por ID
            const autor = await ServiceContainerAutor.autor.getOneById.run(req.params.id);
            
            // Devuelve el autor encontrado (convertido a primitivos)
            return res.status(200).json(autor.mapToPrimitives());
            
        } catch (error) {
            if (error instanceof autorNotFoundError) {
                // Maneja el error específico de "No encontrado"
                return res.status(404).json({ message: error.message });
            }
            next(error); 
        } 
    }

    // POST /autores
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, name, bio, createdAt, updateAt } = req.body as {
                id: string;
                name: string;
                bio: string;
                createdAt: string;
                updateAt: string;
            };

            // Llama al caso de uso para crear el autor
            await ServiceContainerAutor.autor.create.run(
                id,
                name,
                bio,
                new Date(createdAt),
                new Date(updateAt)
            );

            // Devuelve 201 Created y el objeto creado
            const createdAutor = { id, name, bio, createdAt, updateAt };
            return res.status(201).json(createdAutor); 

        } catch (error) {
            next(error);
        }
    }

    // PUT/PATCH /autores
    async edit(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, name, bio, createdAt, updateAt } = req.body as {
                id: string;
                name: string;
                bio: string;
                createdAt: string;
                updateAt: string;
            };

            // Llama al caso de uso para editar el autor
            await ServiceContainerAutor.autor.edit.run(
                id,
                name,
                bio,
                new Date(createdAt),
                new Date(updateAt)
            );

            // Devuelve 200 OK y el objeto actualizado
            const updatedAutor = { id, name, bio, createdAt, updateAt }; 
            return res.status(200).json(updatedAutor); 
            
        } catch (error) {
            if (error instanceof autorNotFoundError) {
                return res.status(404).json({ message: error.message });
            }
            next(error);
        }
    }

    // DELETE /autores/:id
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const idToDelete = req.params.id;
            
            // Llama al caso de uso para eliminar el autor
            await ServiceContainerAutor.autor.delete.run(idToDelete);
            
            // Devuelve 200 OK y un mensaje JSON
            return res.status(200).json({ 
                message: `Autor con ID ${idToDelete} eliminado exitosamente.` 
            });
            
        } catch (error) {
            next(error);
        }
    }
}