// libroContainer.ts

import { InMemoryLibroRepository } from "../../libro/infrastructure/InMemoryLibroRepository";
import { LibroGetAll } from "../../libro/application/libroGetAll/libroGetAll";
import { LibroGetOneById } from "../../libro/application/libroGetOneById/libroGetOneById";
import { LibroCreate } from "../../libro/application/libroCreate/libroCreate";
import { LibroEdit } from "../../libro/application/libroEdit/libroEdit";
import { LibroDelete } from "../../libro/application/libroDelete/libroDelete";

// 1. Instanciar Repositorio
const LibroRepository = new InMemoryLibroRepository();

// 2. Definir y exportar los servicios para el dominio Libro
export const LibroServices = {
    getAll: new LibroGetAll(LibroRepository),
    getOneById: new LibroGetOneById(LibroRepository),
    create: new LibroCreate(LibroRepository),
    edit: new LibroEdit(LibroRepository),
    delete: new LibroDelete(LibroRepository),
};