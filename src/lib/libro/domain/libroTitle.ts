export class libroTitle {
    value: string;

    constructor(value: string) {
        this.value = value;
        this.ensureIsValid();
    }
    
    private ensureIsValid(): void {
        if (this.value === null || this.value === undefined || this.value.trim().length === 0) {
            throw new Error('El título del libro no puede estar vacío.');
        }
        if (this.value.length < 5) {
            throw new Error('El título del libro debe tener al menos 5 caracteres.');
        }

        if (this.value.length > 255) {
            throw new Error('El título del libro no puede exceder los 255 caracteres.');
        }
    }
}
//Value Object

