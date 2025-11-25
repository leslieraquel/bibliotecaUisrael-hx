

import { LibroRepository } from "../../domain/libroRepository";
import path from "path";


export class LibroDownloadPDF {

   constructor(private libroRepository: LibroRepository) {}

    async run(id: string): Promise<string> {
        const libro = await this.libroRepository.searchByMongoId(id);
        if (!libro) throw new Error("Libro no encontrado");

        const fileName = libro.archivo.value; // "archivo.pdf"

        if (!fileName) {
            throw new Error("El libro no tiene archivo asociado");
        }

        const uploadFolder = path.join(process.cwd(), "uploads", "pdfs");
        const fullPath = path.join(uploadFolder, fileName);
        console.log(fullPath);
        return fullPath;
    }
}
