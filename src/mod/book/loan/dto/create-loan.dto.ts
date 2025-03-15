import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsBoolean, IsNumber, IsEmail, IsPositive } from "class-validator";

export class CreateLoanDto {

    @ApiProperty({
        description: 'ID, libro a prestar.',
        type: 'number',
        example: '1'
    })
    @IsNumber()
    // @Transform(({value}) => value.trim())
    readonly libro_id;

    @ApiProperty({
        description: 'ID, usuario pidio el prestamo.',
        type: 'number',
        example: '1'
    })
    @IsNumber()
    // @Transform(({value}) => value.trim())
    readonly usuario_final_id;
}
