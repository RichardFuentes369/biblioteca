import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminDto } from './create-admin.dto';
import { IsString, IsBoolean, IsNumber, IsPositive } from "class-validator";

export class UpdateAdminDto extends PartialType(CreateAdminDto) {

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
