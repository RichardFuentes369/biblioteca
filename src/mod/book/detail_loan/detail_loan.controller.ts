import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetailLoanService } from './detail_loan.service';
import { CreateDetailLoanDto } from './dto/create-detail_loan.dto';
import { UpdateDetailLoanDto } from './dto/update-detail_loan.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('detail-loan')
export class DetailLoanController {
  constructor(private readonly detailLoanService: DetailLoanService) {}

  @ApiTags('detail-loan')
  @Post()
  create(@Body() createDetailLoanDto: CreateDetailLoanDto) {
    return this.detailLoanService.create(createDetailLoanDto);
  }


  @ApiTags('detail-loan')
  @Get()
  findAll() {
    return this.detailLoanService.findAll();
  }


  @ApiTags('detail-loan')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detailLoanService.findOne(+id);
  }


  @ApiTags('detail-loan')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetailLoanDto: UpdateDetailLoanDto) {
    return this.detailLoanService.update(+id, updateDetailLoanDto);
  }


  @ApiTags('detail-loan')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detailLoanService.remove(+id);
  }
}
