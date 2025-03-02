// import { Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsBoolean, IsNumber, IsEmail, IsPositive, IsOptional, IsEnum, Min } from "class-validator";


enum Order {
    asc = 'asc',
    desc = 'desc'
}

export class FilterForId {
    
    @ApiProperty({
        description: 'Id por el que quiero filtrar',
        type: 'number',
        example: '1'
    })

    @IsPositive()
    @IsNumber()
    // @Transform(({value}) => value.trim())
    id?: number;
}

