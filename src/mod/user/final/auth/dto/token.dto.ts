import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class TokenDto {
    @ApiProperty({
        description: 'Acces token',
        type: 'string',
        example: 'eyJhbGciOiJIUzI1NiI....'
    })
    @IsString()
    // @Transform(({value}) => value.trim())
    readonly token;
}