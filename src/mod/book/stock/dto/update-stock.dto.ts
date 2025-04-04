import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateStockDto } from './create-stock.dto';
import { IsNumber, IsPositive, IsString } from 'class-validator';

export class UpdateStockDto extends PartialType(CreateStockDto) {

    @ApiProperty({
        description: 'Id libro en bd',
        type: 'number',
        example: '1'
    })
    @IsPositive()
    @IsNumber()
    // @Transform(({value}) => value.trim())
    id: number;

    @ApiProperty({
        description: 'Titulo de la obra.',
        type: 'string',
        example: 'Cien años de soledad'
    })
    @IsString()
    // @Transform(({value}) => value.trim())
    readonly title;

    @ApiProperty({
        description: 'Nombre editorial.',
        type: 'string',
        example: 'Penguin Classics'
    })
    @IsString()
    // @Transform(({value}) => value.trim())
    readonly publisher;
    
    @ApiProperty({
        description: 'Nombre del autor.',
        type: 'string',
        example: 'Gabriel Garcia Marquez'
    })
    @IsString()
    // @Transform(({value}) => value.trim())
    readonly author;

    @ApiProperty({
        description: 'Año de publicacion.',
        type: 'number',
        example: '1946'
    })
    @IsNumber()
    // @Transform(({value}) => value.trim())
    readonly year_of_publication;

    @ApiProperty({
        description: 'Genero literario.',
        type: 'string',
        example: 'Fitccion'
    })
    @IsString()
    // @Transform(({value}) => value.trim())
    readonly genre;

    @ApiProperty({
        description: 'Idioma.',
        type: 'string',
        example: 'Ingles'
    })
    @IsString()
    // @Transform(({value}) => value.trim())
    readonly language;

    @ApiProperty({
        description: 'ISBN -  Identificador único para libros.',
        type: 'string',
        example: '978-0141439556'
    })
    @IsString()
    // @Transform(({value}) => value.trim())
    readonly isbn;


    @ApiProperty({
        description: 'Libros en stock.',
        type: 'number',
        example: '2500'
    })
    @IsPositive()
    @IsNumber()
    // @Transform(({value}) => value.trim())
    readonly inStock;

    @ApiProperty({
        description: 'Libros prestados.',
        type: 'number',
        example: '30'
    })
    @IsPositive()
    @IsNumber()
    // @Transform(({value}) => value.trim())
    readonly inLoan;

    @ApiProperty({
        description: 'Libros dañados.',
        type: 'number',
        example: '15'
    })
    @IsPositive()
    @IsNumber()
    // @Transform(({value}) => value.trim())
    readonly damaged;


    @ApiProperty({
        description: 'Número total de paginas.',
        type: 'number',
        example: '450'
    })
    @IsPositive()
    @IsNumber()
    // @Transform(({value}) => value.trim())
    readonly size_pages;

    

}
