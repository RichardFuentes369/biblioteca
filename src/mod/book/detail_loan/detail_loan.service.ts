import { Injectable } from '@nestjs/common';
import { CreateDetailLoanDto } from './dto/create-detail_loan.dto';
import { UpdateDetailLoanDto } from './dto/update-detail_loan.dto';

@Injectable()
export class DetailLoanService {
  create(createDetailLoanDto: CreateDetailLoanDto) {
    return 'This action adds a new detailLoan';
  }

  findAll() {
    return `This action returns all detailLoan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detailLoan`;
  }

  update(id: number, updateDetailLoanDto: UpdateDetailLoanDto) {
    return `This action updates a #${id} detailLoan`;
  }

  remove(id: number) {
    return `This action removes a #${id} detailLoan`;
  }
}
