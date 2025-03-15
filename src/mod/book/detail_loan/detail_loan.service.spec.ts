import { Test, TestingModule } from '@nestjs/testing';
import { DetailLoanService } from './detail_loan.service';

describe('DetailLoanService', () => {
  let service: DetailLoanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetailLoanService],
    }).compile();

    service = module.get<DetailLoanService>(DetailLoanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
