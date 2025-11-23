import { CEDULA_10 } from '../../shared/infrastructure/regex';;
export class UserCi{
    value: string;

    constructor(value: string){
        this.value = value;
        this.ensureIsValid();
    }
    private ensureIsValid(){
        if(this.value.length < 1){
            throw new Error("La cédula no puede estar vacía");
        }
         if (!CEDULA_10.test(this.value)) {
            throw new Error("La cédula debe tener exactamente 10 dígitos numéricos");
        }
    }
}