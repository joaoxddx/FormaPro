import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateCategoriaDto {

    @ApiProperty({example:'Desenvolvimento Web'})
    @IsNotEmpty()
    Nome : string;

    @IsNotEmpty()
    Descricao : string;

}
