// import { Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsBoolean, IsNumber, IsEmail, IsPositive, IsOptional, IsEnum, Min } from "class-validator";


export class FileOption {
    
    @ApiProperty({
        description: 'tipo archivo entre xls - xml - csv - json',
        type: 'string',
        example: 'xls'
    })

    @IsString()
    // @Transform(({value}) => value.trim())
    extension: string;
}

