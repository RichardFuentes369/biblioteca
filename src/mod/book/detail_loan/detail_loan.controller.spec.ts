import { Test, TestingModule } from '@nestjs/testing';
import { DetailLoanController } from './detail_loan.controller';
import { DetailLoanService } from './detail_loan.service';

describe('DetailLoanController', () => {
  let controller: DetailLoanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetailLoanController],
      providers: [DetailLoanService],
    }).compile();

    controller = module.get<DetailLoanController>(DetailLoanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
