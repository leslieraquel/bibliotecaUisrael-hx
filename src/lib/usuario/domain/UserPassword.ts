import bcrypt from 'bcrypt';

export class UserPassword {
    value: string;

    constructor(value: string){
        this.value = value;
        this.ensureIsValid();
    }

    private ensureIsValid(){
        // Validaciones básicas de contraseña
        if (this.value.length < 6) {
            throw new Error('La contraseña debe tener al menos 6 caracteres');
        }
    }

    // Método para crear contraseñas hasheadas (usar en UserCreate)
    static create(plainPassword: string): UserPassword {
        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(plainPassword, saltRounds);
        return new UserPassword(hashedPassword);
    }

    // Método para verificar contraseñas (usar en UserLogin)
    match(plainPassword: string): boolean {
        return bcrypt.compareSync(plainPassword, this.value);
    }

    // Getter para obtener el valor
    getValue(): string {
        return this.value;
    }
}