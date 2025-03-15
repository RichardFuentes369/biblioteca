import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '@global/dto/pagination.dto';
import { FilterAnyFieldDto } from '@global/dto/filter-any-field.dto';

@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  // hacer una sonda que despues de 2 dias si esta en solicitud limpie la tabla

  @ApiTags('loan')
  @Post('solicitud-prestamo')
  create(@Body() createLoanDto: CreateLoanDto) {
    return this.loanService.create(createLoanDto);
  }

  @ApiTags('loan')
  @Get('mostrar-solicitudes-prestamo')
  findAll(@Query() paginationDto: PaginationDto) {
    return this.loanService.findAll('',paginationDto);
  }

  @ApiTags('loan')
  @Get('filtro-solicitudes-prestamo')
  filterSolicitudes(@Query() filterAnyFieldDto: FilterAnyFieldDto) {
    return this.loanService.filterSolicitudes(filterAnyFieldDto);
  }

  @ApiTags('loan')
  @Patch('actualizar-solicitudes-prestamo')
  updateSolicitudPrestamo(@Body() updateLoanDto: UpdateLoanDto) {
    return this.loanService.update(updateLoanDto);
  }

}
