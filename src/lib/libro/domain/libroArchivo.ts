export class libroArchivo {
    constructor(public value: string | null) {
        if (value !== null && typeof value !== "string") {
            throw new Error("El archivo debe ser una ruta válida");
        }
    }
}