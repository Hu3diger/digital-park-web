import { TitleCasePipe } from "@angular/common";
import { Injectable } from "@angular/core";

@Injectable()
export class Utils {
    constructor(protected readonly pipe: TitleCasePipe){}

    /**
     * @augments {Array<Any>} values - Um array contendo objetos com a propriedade ID, a qual será usada para o retorno.
     * @returns {string} Resultado da transformação
     */
    public listOfObjectToString(values: Array<any>): String{
        return values.map((value) => this.pipe.transform(value.id)).join(', ').replace(/, ([^,]*)$/, ' e $1');
    }
}