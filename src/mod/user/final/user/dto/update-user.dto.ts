import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsBoolean, IsNumber, IsPositive } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsPositive()
    @IsNumber()
    // @Transform(({value}) => value.trim())
    id: number;
    
    @IsString()
    // @Transform(({value}) => value.trim())
    readonly firstName;

    @IsString()
    // @Transform(({value}) => value.trim())
    readonly lastName;

    @IsBoolean()
    // @Transform(({value}) => value.trim())
    readonly isActive;
}
