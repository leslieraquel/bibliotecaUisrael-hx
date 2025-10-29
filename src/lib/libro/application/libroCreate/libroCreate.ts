import { libro } from "../../domain/libro";
import { libroCreatedAt } from "../../domain/libroCreatedAt";
import { libroEditorial } from "../../domain/libroEditorial";
import { libroId } from "../../domain/libroId";
import { libroIsbn } from "../../domain/libroIsbn";
import { libroTitle } from "../../domain/libroTitle";
import { libroUpdateAt } from "../../domain/libroUpdateAt";
import { libroYear } from "../../domain/libroYear";
import { LibroRepository } from "../../domain/libroRepository"; 

export class LibroCreate {
    constructor(
        private repository: LibroRepository
        ) {}
    async run(
        id: string,
        title: string,
        isbn: string,
        editorial: string,
        year: string, 
        createdAt: Date,
        updateAt: Date
    ): Promise<void> {

        const libroEntity = new libro(
            new libroId(id),
            new libroTitle(title),
            new libroIsbn(isbn),
            new libroEditorial(editorial),
            new libroYear(year), 
            new libroCreatedAt(createdAt),
            new libroUpdateAt(updateAt)
        );

        return this.repository.create(libroEntity);
    }
}