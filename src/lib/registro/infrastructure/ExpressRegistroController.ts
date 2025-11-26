import { NextFunction, Request, Response } from "express";
import { RegistroServices } from "../../shared/infrastructure/ServiceContainerRegistro"; // Asume que este es el contenedor central
import { registroNotFoundError } from "../domain/registroNotFoundError"; 

export class ExpressRegistroController {

    // GET /registros
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            // Llama al caso de uso para obtener todos los registros
            const registros = await RegistroServices.registro.getAll.run();
            // Convierte cada entidad a primitivos antes de la respuesta JSON
            return res.status(200).json(registros.map((registro) => registro.mapToPrimitives()));
        } catch (error) {
            next(error);
        }
    }

    // GET /registros/:id
    async getOneById(req: Request, res: Response, next: NextFunction) {
        try {
            // Llama al caso de uso para obtener un registro por ID
            const registro = await RegistroServices.registro.getOneById.run(req.params.id);
            
            // Devuelve el registro encontrado (convertido a primitivos)
            return res.status(200).json(registro.mapToPrimitives());
            
        } catch (error) {
            if (error instanceof registroNotFoundError) {
                // Maneja el error específico de "No encontrado"
                return res.status(404).json({ message: error.message });
            }
            next(error); 
        } 
    }

    // POST /registros
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            // Campos específicos del registro
            const { prestamoDate, devolucionDate, estado,idLibro,idEstudiante, createdAt } = req.body as {
                prestamoDate: string;
                devolucionDate: string;
                estado: string; // Ej: 'ACTIVO'
                idLibro:string;
                idEstudiante:string;
                createdAt:Date;
                updateAte:Date;
            };

            // Llama al caso de uso para crear el registro
            await RegistroServices.registro.create.run(
                new Date(prestamoDate),
                new Date(devolucionDate),
                estado,
                idLibro,
                idEstudiante,
                new Date(createdAt),
                new Date(createdAt),
            );

            // Devuelve 201 Created y el objeto creado
            const createdRegistro = {prestamoDate, devolucionDate, estado, createdAt };
            return res.status(201).json(createdRegistro); 

        } catch (error) {
            next(error);
        }
    }

    // PUT/PATCH /registros
    async edit(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, prestamoDate, devolucionDate, estado,idLibro,idEstudiante, createdAt,updateAt } = req.body as {
                id: string;
                prestamoDate: string;
                devolucionDate: string;
                estado: string;
                idLibro:string;
                idEstudiante:string;
                createdAt: string;
                updateAt:string;
            };

            // Llama al caso de uso para editar el registro (ej. al cambiar el estado a 'DEVUELTO')
            await RegistroServices.registro.edit.run(
                id,
                new Date(prestamoDate),
                new Date(devolucionDate),
                estado,
                idLibro,
                idEstudiante,
                new Date(createdAt),
                new Date(updateAt)

            );

            // Devuelve 200 OK y el objeto actualizado
            const updatedRegistro = { id, prestamoDate, devolucionDate, estado,idLibro,idEstudiante, createdAt }; 
            return res.status(200).json(updatedRegistro); 
            
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
            
            // Llama al caso de uso para eliminar el registro
            await RegistroServices.registro.delete.run(idToDelete);
            
            // Devuelve 200 OK y un mensaje JSON
            return res.status(200).json({ 
                message: `Registro con ID ${idToDelete} eliminado exitosamente.` 
            });
            
        } catch (error) {
            next(error);
        }
    }
}