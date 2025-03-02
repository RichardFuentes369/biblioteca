// import { Transform } from "class-transformer";
import { IsString, IsBoolean, IsNumber, IsEmail, IsPositive, IsOptional, IsEnum, Min } from "class-validator";


enum Order {
    asc = 'asc',
    desc = 'desc'
}

export class FilterForId {
    @IsPositive()
    @IsNumber()
    // @Transform(({value}) => value.trim())
    id?: number;
}

