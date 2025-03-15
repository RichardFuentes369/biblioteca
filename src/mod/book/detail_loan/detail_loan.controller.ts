import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetailLoanService } from './detail_loan.service';
import { CreateDetailLoanDto } from './dto/create-detail_loan.dto';
import { UpdateDetailLoanDto } from './dto/update-detail_loan.dto';

@Controller('detail-loan')
export class DetailLoanController {
  constructor(private readonly detailLoanService: DetailLoanService) {}

  @Post()
  create(@Body() createDetailLoanDto: CreateDetailLoanDto) {
    return this.detailLoanService.create(createDetailLoanDto);
  }

  @Get()
  findAll() {
    return this.detailLoanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detailLoanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetailLoanDto: UpdateDetailLoanDto) {
    return this.detailLoanService.update(+id, updateDetailLoanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detailLoanService.remove(+id);
  }
}
