import { estudianteId } from "./estudianteId";
import { estudianteName } from "./estudianteNombre";
import { estudianteCorreo } from "./estudianteCorreo";
import { estudianteCarrera } from "./estudianteCarer";
import { estudianteCreatedAt } from "./estudianteCreateAt";
import { estudianteUpdateAt } from "./estudianteUpdateAt";


export class estudiante{
    //id: string;
    id: estudianteId;
    name: estudianteName;
    email: estudianteCorreo;
    carrera: estudianteCarrera;
    createdAt: estudianteCreatedAt;
    updateAt:estudianteUpdateAt;
    
    constructor(id: estudianteId, name: estudianteName, email: estudianteCorreo, createdAt: estudianteCreatedAt,carrera:estudianteCarrera,updateAt:estudianteUpdateAt){
        this.id = id;
        this.name = name;
        this.email = email;
        this.createdAt = createdAt;
        this.carrera = carrera;
        this.updateAt=updateAt;
    }
    //Ejemplo: Servicio de Dominio, no depende de application o infrastructure
    public nameAndEmail(){
        return `${this.name} - ${this.email}`;
    }
    public mapToPrimitives(){
        return{
            id:this.id.value,
            name:this.name.value,
            email:this.email.value,
            carrera:this.carrera.value,
            createdAt:this.createdAt.value,
        };
    }
}