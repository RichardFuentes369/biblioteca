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
import { AdminGuard } from '@guard/admin/admin.guard'
import { FinalGuard } from '@guard/final/final.guard'

@Controller('stock')
export class StockController {
  constructor(
    private readonly stockService: StockService,
    private readonly auafb: AUAFB
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

    @ApiTags('stock')
    @Get('cargue-archivo')
    fileupload(@Query() optionfile: FileOption) {
      return this.auafb.cargaDataLibros(optionfile);
    }
   

}
