export class autorNombre {
    readonly value: string;

    constructor(value: string) {
        this.value = value;
        this.ensureIsValid();
    }
    private ensureIsValid(): void {
        // ** Aquí va la lógica de validación específica del nombre del autor **
        if (this.value === null || this.value === undefined || this.value.trim().length === 0) {
            throw new Error('El nombre del autor no puede estar vacío.');
        }

        if (this.value.length < 3) {
            throw new Error('El nombre del autor debe tener al menos 3 caracteres.');
        }

        if (this.value.length > 100) {
            throw new Error('El nombre del autor no puede exceder los 100 caracteres.');
        }
    }
}

