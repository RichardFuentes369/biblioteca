import { DataSource } from 'typeorm';
import { DetailLoan } from './detail_loan.entity';

export const detailLoanProvider = [
  {
    provide: 'DETAILLOAN_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(DetailLoan),
    inject: ['DATA_SOURCE'],
  },
];