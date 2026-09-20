import {IsNotEmpty, IsNumber, isNumber, IsString, isString} from "class-validator";

export class CreateModuloDto {

    @IsNumber()
    @IsNotEmpty()
    ID_Curso: number;

    @IsString()
    @IsNotEmpty()
    Titulo: string;

    @IsNumber()
    @IsNotEmpty()
    Ordem: number;

}
