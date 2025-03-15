import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateLoanDto } from './create-loan.dto';
import { IsNumber } from 'class-validator';

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
        description: 'Estado del prestamo.',
        type: 'String',
        example: 'Solicitado - Prestado - Entregado'
    })
    @IsNumber()
    // @Transform(({value}) => value.trim())
    readonly usuario_final_id;

    @ApiProperty({
        description: 'Fecha prestamo.',
        type: 'number',
        example: '1'
    })
    @IsNumber()
    // @Transform(({value}) => value.trim())
    readonly fecha_prestamo;
    
    @ApiProperty({
        description: 'Fecha entrega prestamo.',
        type: 'number',
        example: '1'
    })
    @IsNumber()
    // @Transform(({value}) => value.trim())
    readonly fecha_entrega;
}
