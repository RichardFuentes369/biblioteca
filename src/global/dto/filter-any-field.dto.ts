// import { Transform } from "class-transformer";
import { IsString, IsBoolean, IsNumber, IsEmail, IsPositive, IsOptional, IsEnum, Min } from "class-validator";


enum Order {
    asc = 'asc',
    desc = 'desc'
}

export class FilterAnyFieldDto {

    @IsString()
    fields?: string;

    @IsString()
    values?: string;
    
    @IsPositive()
    @IsNumber()
    @Min(1)
    limit?: number;

    @IsNumber()
    @Min(1)
    page?: number;

    @IsOptional()
    @IsString()
    field?: string;

    @IsOptional()
    @IsString()
    @IsEnum(Order)
    order?: string;
}

