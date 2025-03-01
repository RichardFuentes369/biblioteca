// import { Transform } from "class-transformer";
import { IsString, IsBoolean, IsNumber, IsEmail, IsPositive, IsOptional, IsEnum } from "class-validator";


enum Order {
    asc = 'asc',
    desc = 'desc'
}

export class FilterAnyFieldDto {

    @IsPositive()
    @IsNumber()
    // @Transform(({value}) => value.trim())
    id: number;

    @IsOptional()
    @IsString()
    field?: string;

    @IsOptional()
    @IsString()
    @IsEnum(Order)
    order?: string;
    
}


/*
   let orderOptions = {};

    if (filterAnyFieldDto.field && filterAnyFieldDto.order) {
      orderOptions[filterAnyFieldDto.order] = filterAnyFieldDto.order;
    } else {
      orderOptions["id"] = 'desc';
    }
    
    let result = await this.adminRepository.findOne({
      where: [ {id: filterAnyFieldDto.id} ],
      order: orderOptions
    });
    */