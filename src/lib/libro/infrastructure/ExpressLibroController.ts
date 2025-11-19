import { NextFunction, Request, Response } from "express";
import { LibroServices } from "../../shared/infrastructure/ServiceContainerLibro"; 
import { libroNotFoundError } from "../domain/libroNotFoundError"; 
import multer from "multer";

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
    // async getOneById(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const libro = await LibroServices.getOneById.run(req.params.id); 
    //         return res.status(200).json(libro.mapToPrimitives());
    //     } catch (error) {
    //         if (error instanceof libroNotFoundError) {
    //             return res.status(404).json({ message: error.message });
    //         }
    //         next(error);
    //     }
    // }
    

    // POST /libros
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { title, isbn, editorial, year,idAutor,sinopsis,archivo,estado, createdAt, updateAt } = req.body as {
                // id: string;
                title: string;
                isbn: string;
                editorial: string;
                year: string;
                idAutor:string;
                sinopsis:string;
                archivo:string;
                estado:string;
                createdAt: string;
                updateAt: string;
            };
        const archivoUrl = req.file ? `http://localhost:3000/uploads/pdfs/${req.file.filename}`: "";

        
             // Comprueba si llega el archivo (Multer)
      if (!req.file) {
        // Si quieres que el archivo sea obligatorio:
        return res.status(400).json({ message: "No se subió ningún archivo (campo 'archivo')" });
        // Si NO es obligatorio, comenta la línea anterior y usa archivoUrl = archivo || null
      }
        

            await LibroServices.create.run( 
                // id,
                title,
                isbn,
                editorial,
                year,
                idAutor,
                sinopsis,
                archivoUrl,
                estado,
                new Date(createdAt),
                new Date(updateAt)
            );

            return res.status(201).json({ title, isbn, editorial, year,idAutor,sinopsis,archivo,estado, createdAt, updateAt });

        } catch (error) {
            next(error);
        }
    }

    // PUT/PATCH /libros/:id
    async edit(req: Request, res: Response, next: NextFunction) {
        try {
            const {  id,title, isbn, editorial, year,idAutor,sinopsis,archivo,estado, createdAt, updateAt } = req.body as {
                id: string;
                title: string;
                isbn: string;
                editorial: string;
                year: string;
                idAutor:string;
                sinopsis:string;
                archivo:string;
                estado:string;
                createdAt: string;
                updateAt: string;
            };
            
            await LibroServices.edit.run(
                id,
                title,
                isbn,
                editorial,
                year,
                idAutor,
                sinopsis,
                archivo,
                estado,
                new Date(createdAt),
                new Date(updateAt)
            );

            return res.status(200).json({ title, isbn, editorial, year,idAutor,sinopsis,archivo,estado, createdAt, updateAt });

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