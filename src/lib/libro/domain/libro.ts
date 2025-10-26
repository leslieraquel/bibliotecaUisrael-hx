import { libroId } from "./libroId";
import { libroTitle } from "./libroTitle";
import { libroIsbn } from "./libroIsbn";
import { libroEditorial } from "./libroEditorial";
import { libroYear } from "./libroYear";
import { libroCreatedAt } from "./libroCreatedAt";
import { libroUpdateAt } from "./libroUpdateAt";

export class libro {
    id: libroId;
    title: libroTitle;
    isbn: libroIsbn;
    editorial: libroEditorial;
    year: libroYear;
    createdAt: libroCreatedAt;
    updateAt: libroUpdateAt;

    constructor(
        id: libroId,
        title: libroTitle,
        isbn: libroIsbn,
        editorial: libroEditorial,
        year: libroYear,
        createdAt: libroCreatedAt,
        updateAt: libroUpdateAt
    ) {
        this.id = id;
        this.title = title;
        this.isbn = isbn;
        this.editorial = editorial;
        this.year = year;
        this.createdAt = createdAt;
        this.updateAt = updateAt;
    }


    public titleAndYear(): string {
        return `${this.title.value} (${this.year.value})`;
    }

    // Método para convertir la Entidad a una estructura de datos simple (primitivos).
    public mapToPrimitives() {
        return {
            id: this.id.value,
            title: this.title.value,
            isbn: this.isbn.value,
            editorial: this.editorial.value,
            year: this.year.value,
            createdAt: this.createdAt.value,
            updateAt: this.updateAt.value,
        };
    }
    public updateTitle(newTitle: libroTitle): void {
        this.title = newTitle;
    }
}