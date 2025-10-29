import { libro } from "../../domain/libro";
import { libroCreatedAt } from "../../domain/libroCreatedAt";
import { libroEditorial } from "../../domain/libroEditorial";
import { libroId } from "../../domain/libroId";
import { libroIsbn } from "../../domain/libroIsbn";
import { libroTitle } from "../../domain/libroTitle";
import { libroUpdateAt } from "../../domain/libroUpdateAt";
import { libroYear } from "../../domain/libroYear";
import { libroIdAutor } from "../../domain/libroIdAutor";

import { LibroRepository } from "../../domain/libroRepository";

export class LibroEdit {
    
    constructor(private repository: LibroRepository) {}
    async run(
        id: string,
        title: string,
        isbn: string,
        editorial: string,
        year: string, 
        idAutor: string, 
        createdAt: Date,
        updateAt: Date
    ): Promise<void> {
        const libroEntity = new libro(
            new libroId(id),
            new libroTitle(title),
            new libroIsbn(isbn),
            new libroEditorial(editorial),
            new libroYear(year),
            new libroIdAutor(idAutor),
            new libroCreatedAt(createdAt),
            new libroUpdateAt(updateAt)
        );

        return this.repository.edit(libroEntity);
    }
}