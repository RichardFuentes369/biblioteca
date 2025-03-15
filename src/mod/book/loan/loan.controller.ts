import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  // si presto 2 libros ya no puede prestar mas

  @ApiTags('loan')
  @Post('solicitud-prestamo')
  create(@Body() createLoanDto: CreateLoanDto) {
    return this.loanService.create(createLoanDto);
  }

}
