import { PartialType } from '@nestjs/swagger';
import { CreateDetailLoanDto } from './create-detail_loan.dto';

export class UpdateDetailLoanDto extends PartialType(CreateDetailLoanDto) {}
