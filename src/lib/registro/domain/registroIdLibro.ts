export class registroIdLibro{
    value: string;

    constructor(value: string){
        this.value = value;
        this.ensureIsValid();
    }
    private ensureIsValid(){
        if(this.value.length < 1){
            throw new Error("La longitud debe ser mayor a 1 ");
        }
    }
}