// import { Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsBoolean, IsNumber, IsEmail } from "class-validator";

export class CreateAdminDto {

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
