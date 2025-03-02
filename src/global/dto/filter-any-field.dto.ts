// import { Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsBoolean, IsNumber, IsEmail, IsPositive, IsOptional, IsEnum, Min } from "class-validator";


enum Order {
    asc = 'asc',
    desc = 'desc'
}

export class FilterAnyFieldDto {

    @ApiProperty({
        description: 'Campos para filtrar, separados por pipes (|). Debe haber la misma cantidad de campos y valores en "values".',
        type: 'string',
        example: 'nombre|edad|ciudad'
    })
    @IsString()
    fields?: string;

    @ApiProperty({
        description: 'Campos para filtrar, separados por pipes (|). Debe haber la misma cantidad de campos y valores en "fields".',
        type: 'string',
        example: 'nombre|edad|ciudad'
    })
    @IsString()
    values?: string;
    
    @ApiProperty({
        description: 'Cuantos valores quiero mostrar por pagina',
        type: 'number',
        example: '10'
    })
    @IsPositive()
    @IsNumber()
    @Min(1)
    limit?: number;

    @ApiProperty({
        description: 'Pagina en la que voy a estar actualmente',
        type: 'number',
        example: '1'
    })
    @IsNumber()
    @Min(1)
    page?: number;

    @ApiProperty({
        description: 'Campo por el que deseo ordenar',
        type: 'string',
        example: 'id'
    })
    @IsOptional()
    @IsString()
    field?: string;

    @ApiProperty({
        description: 'Como deseo mostrar la lista".',
        type: 'string',
        example: 'asc|desc'
    })
    @IsOptional()
    @IsString()
    @IsEnum(Order)
    order?: string;
}



