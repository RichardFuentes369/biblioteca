import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateLoanDto } from './create-loan.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateLoanDto extends PartialType(CreateLoanDto) {
    @ApiProperty({
        description: 'ID, solicitud.',
        type: 'number',
        example: '1'
    })
    @IsNumber()
    // @Transform(({value}) => value.trim())
    readonly id;

    @ApiProperty({
        description: 'ID, usuario biblioteca id.',
        type: 'number',
        example: '1'
    })
    @IsNumber()
    // @Transform(({value}) => value.trim())
    readonly usuario_biblioteca_id;

    @ApiProperty({
        description: 'Fecha prestamo.',
        type: 'number|null',
        example: Date.now() / 1000
    })
    @IsOptional()
    @IsNumber()
    // @Transform(({value}) => value.trim())
    readonly fecha_prestamo?: number | null;
    
    @ApiProperty({
        description: 'Fecha entrega prestamo.',
        type: 'number|null',
        example: Date.now() / 1000
    })
    @IsOptional()
    @IsNumber()
    // @Transform(({value}) => value.trim())
    readonly fecha_entrega?: number | null;


    @ApiProperty({
        description: 'Estado del prestamo.',
        type: 'String',
        example: 'Solicitado - Prestado - Entregado'
    })
    @IsString()
    // @Transform(({value}) => value.trim())
    readonly type;
}
