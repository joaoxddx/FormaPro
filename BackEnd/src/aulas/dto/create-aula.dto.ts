import {IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateAulaDto {
    @ApiProperty({example:1,required:true})
    @IsNumber()
    ID_Modulo: number;
    @ApiProperty({example:'Configurando Ambiente',required:true})
    @IsString()
    Titulo: string;
    @ApiProperty({example:'https://youtu.be/ObtS79k2NM4',required:true})
    @IsString()
    URL_Conteudo: string;
    @ApiProperty({example:3,required:true})
    @IsNumber()
    DuracaoMinutos: number;
    @ApiProperty({example:4,description: 'Ordem das aulas que ira aparecer no modulo', required:true})
    @IsNumber()
    Ordem: number;
}
