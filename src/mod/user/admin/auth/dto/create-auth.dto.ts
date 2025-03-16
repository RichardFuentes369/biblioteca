import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
export class CreateAuthadminDto {

    @ApiProperty({
        description: 'Username login.',
        type: 'string',
        example: 'correo@example.com'
    })
    @IsString()
    // @Transform(({value}) => value.trim())
    readonly username;

    @ApiProperty({
        description: 'Password.',
        type: 'string',
        example: '*********'
    })
    @IsString()
    // @Transform(({value}) => value.trim())
    readonly pass;
    
}

    
