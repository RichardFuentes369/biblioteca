
import { DataSource } from 'typeorm';
import { Stock } from './stock.entity';

export const stokProvider = [
  {
    provide: 'STOCK_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Stock),
    inject: ['DATA_SOURCE'],
  },
];