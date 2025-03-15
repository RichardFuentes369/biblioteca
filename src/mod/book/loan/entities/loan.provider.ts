import { DataSource } from 'typeorm';
import { Loan } from './loan.entity';

export const loanProvider = [
  {
    provide: 'LOAN_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Loan),
    inject: ['DATA_SOURCE'],
  },
];