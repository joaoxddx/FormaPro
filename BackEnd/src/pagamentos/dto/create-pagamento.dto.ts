import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsNumber, IsString, IsDateString } from 'class-validator';

export class CreatePagamentoDto {
    @ApiProperty({ example: 1, description: 'ID da assinatura', required: true })
    @IsNumber()
    @IsNotEmpty()
    ID_Assinatura: number;

    @ApiProperty({ example: 49.9, description: 'Valor pago no pagamento', required: true })
    @IsNumber()
    @IsNotEmpty()
    ValorPago: number;

    @ApiProperty({ example: 'cartao_credito', description: 'Método de pagamento', required: true })
    @IsString()
    @IsNotEmpty()
    MetodoPagamento: string;

    @ApiProperty({ example: 'TRANS-987654321', description: 'ID da transação no gateway', required: true })
    @IsString()
    @IsNotEmpty()
    Id_Transacao_Gateway: string;

}
