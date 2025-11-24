import { libro } from "../../domain/libro";
import { libroCreatedAt } from "../../domain/libroCreatedAt";
import { libroEditorial } from "../../domain/libroEditorial";
import { libroId } from "../../domain/libroId";
import { libroIsbn } from "../../domain/libroIsbn";
import { libroTitle } from "../../domain/libroTitle";
import { libroUpdateAt } from "../../domain/libroUpdateAt";
import { libroYear } from "../../domain/libroYear";
import { LibroRepository } from "../../domain/libroRepository"; 
import { libroIdAutor } from "../../domain/libroIdAutor"; 
import { libroSinopsis } from "../../domain/libroSinopsis"; 
import { libroArchivo } from "../../domain/libroArchivo"; 
import { libroEstado } from "../../domain/libroEstado"; 



export class LibroCreate {
    constructor(
        private repository: LibroRepository
        ) {}
    async run(
        title: string,
        isbn: string,
        editorial: string,
        year: string, 
        idutor:string,
        sinopsis:string,
        archivo:string,
        estado:string,
        createdAt: Date,
        updateAt: Date
    ): Promise<void> {

        const libroEntity = new libro(
            null,
            new libroTitle(title),
            new libroIsbn(isbn),
            new libroEditorial(editorial),
            new libroYear(year), 
            new libroIdAutor(idutor), 
            new libroSinopsis(sinopsis), 
            new libroArchivo(archivo), 
            new libroEstado(estado), 
            new libroCreatedAt(createdAt),
            new libroUpdateAt(updateAt)
        );

        return this.repository.create(libroEntity);
    }
}