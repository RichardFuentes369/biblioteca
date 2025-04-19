import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

import { FileOption } from './dto/file-option.dto'

import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '@global/dto/pagination.dto';
import { FilterAnyFieldDto } from '@global/dto/filter-any-field.dto';
import { FilterForId } from '@global/dto/filter-for-id.dto';

import { AdapterUploadAnyFileBookService as AUAFB } from '@patron/adapter/service/adapter.service';
import { BuilderSearchService as BSS } from '@patron/builder/service/builder.service';
import { AdminGuard } from '@guard/admin/admin.guard'
import { FinalGuard } from '@guard/final/final.guard'
import { FilterBookDto } from './dto/filter-book.dto';

@Controller('stock')
export class StockController {
  constructor(
    private readonly stockService: StockService,
    private readonly auafb: AUAFB,
    private readonly bss: BSS
  ) {}

    @ApiTags('stock')
    // @UseGuards(AdminGuard)
    @Post('crear-stock')
    create(@Body() createStockDto: CreateStockDto) {
      return this.stockService.create(createStockDto);
    }

    @ApiTags('stock')
    // @UseGuards(AdminGuard)
    @Patch('editar-stock')
    update(@Body() updateStockDto: UpdateStockDto) {
      return this.stockService.update(updateStockDto);
    }
    
    @ApiTags('stock')
    // @UseGuards(AdminGuard)
    @Delete('eliminar-stock')
    remove(@Query() filterForId: FilterForId) {
      return this.stockService.remove(filterForId);
    }


    // publicas
    @ApiTags('stock')
    @Get('lista')
    findAll(@Query() paginationDto: PaginationDto) {
      return this.stockService.findAll('',paginationDto);
    }

    @ApiTags('stock')
    @Get('filtro-stock')
    filterBooks(@Query() filterAnyFieldDto: FilterAnyFieldDto) {
      return this.stockService.filterBooks(filterAnyFieldDto);
    }

    @ApiTags('stock')
    @Get('obtener-stock')
    findOne(@Query() filterForId: FilterForId) {
      return this.stockService.findOne(filterForId);
    }


    // patrones

    // adapter
    // cargar archivos xls, json, csv, xml
    // para poblar la tabla de libros
    @ApiTags('stock')
    @Get('cargue-archivo')
    fileupload(@Query() optionfile: FileOption) {
      return this.auafb.cargaDataLibros(optionfile);
    }

    // builder
    // buscar libro por criterio
    @ApiTags('stock')
    @Get('busqueda-libro')
    searchFilter(@Query() filterBookDto: FilterBookDto) {
      return this.bss.busquedaLibro(filterBookDto);
    }

    // singleton
    // buscar maxima cantidad libros permitidos a prestar
    @ApiTags('stock')
    @Get('prestamos-permitidos-por-usuario')
    allowLoanForUser() {
      return this.stockService.allowLoanForUser();
    }

}
