import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator"

enum Order {
  asc = 'asc',
  desc = 'desc'
}

export class PaginationDto {

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