import { EMAIL_REGEX } from "../../shared/infrastructure/regex";
export class UserEmail{
    value: string;

    constructor(value: string){
        this.value = value;
        this.ensureIsValid();
    }
     private ensureIsValid() {
    if (this.value.length === 0) {
      throw new Error('El email no puede estar vacío');
    }
    if (!EMAIL_REGEX.test(this.value)) {
      throw new Error('El email no tiene un formato válido');
    }
  }
}