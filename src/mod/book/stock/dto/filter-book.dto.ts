import { IsEnum, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator"

enum Order {
  asc = 'asc',
  desc = 'desc'
}

export class FilterBookDto {

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

  @IsOptional()
  @IsString()
  title?: string;    
  
  @IsOptional()
  @IsString()
  publisher?: string;

  @IsOptional()
  @IsString()
  author?: string;    
  
  @IsOptional()
  @IsNumber()
  year_of_publication?: number;

  @IsOptional()
  @IsString()
  genre?: string;

  @IsOptional()
  @IsString()
  isbn?: string;

  @IsOptional()
  @IsNumber()
  inStock?: number;  
  
  @IsOptional()
  @IsNumber()
  inLoan?: number;  
  
  @IsOptional()
  @IsNumber()
  damaged?: number;  
  
  @IsOptional()
  @IsNumber()
  total?: number;  
  
  @IsOptional()
  @IsNumber()
  size_pages?: number;  
  
  @IsOptional()
  @IsString()
  language?: string;
    
}