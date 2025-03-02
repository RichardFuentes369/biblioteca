import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '@global/dto/pagination.dto';
import { FilterAnyFieldDto } from '@global/dto/filter-any-field.dto';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

    @ApiTags('stock')
    @Get()
    // @UseGuards(AdminGuard)
    findAll(@Query() paginationDto: PaginationDto) {
      return this.stockService.findAll('',paginationDto);
    }

    @ApiTags('stock')
    @Get('obtener-libro')
    findOne(@Query() filterAnyFieldDto: FilterAnyFieldDto) {
      return this.stockService.findOne(filterAnyFieldDto);
    }

    @ApiTags('stock')
    @Get('filtro-libro')
    filterBooks(@Query() filterAnyFieldDto: FilterAnyFieldDto) {
      return this.stockService.filterBooks(filterAnyFieldDto);
    }
  

}
