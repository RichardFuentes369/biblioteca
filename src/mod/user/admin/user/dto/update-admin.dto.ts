import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminDto } from './create-admin.dto';
import { IsString, IsBoolean, IsNumber, IsPositive, IsEmail } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {

    @ApiProperty({
        description: 'Id usuario en bd',
        type: 'number',
        example: '1'
    })
    @IsPositive()
    @IsNumber()
    // @Transform(({value}) => value.trim())
    id: number;
    
    @ApiProperty({
        description: 'Nombres del usuario.',
        type: 'string',
        example: 'Pedro Pablo'
    })
    @IsString()
    // @Transform(({value}) => value.trim())
    readonly firstName;

    @ApiProperty({
        description: 'Apellidos del usuario.',
        type: 'string',
        example: 'Leon Jaramillo'
    })
    @IsString()
    @IsString()
    // @Transform(({value}) => value.trim())
    readonly lastName;

    @ApiProperty({
        description: 'Correo del usuario, este no debe estar registrado.',
        type: 'string',
        example: 'example@correo.com'
    })
    @IsEmail()
    // @Transform(({value}) => value.trim())
    readonly email;

    @ApiProperty({
        description: 'Contraseña que desdea registrar.',
        type: 'string',
        example: 'my-contraseña'
    })
    @IsString()
    // @Transform(({value}) => value.trim())
    readonly password;

    @ApiProperty({
        description: 'Usuario activo.',
        type: 'boolean',
        format: 'binary',
        example: 'true|false'
    })
    @IsBoolean()
    // @Transform(({value}) => value.trim())
    readonly isActive;
}
