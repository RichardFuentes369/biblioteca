import { Module } from '@nestjs/common';

import { GlobalModule } from '@global/global.module';
import { detailLoanProvider } from './entities/detail_loan.provider';
import { DetailLoanService } from './detail_loan.service';
import { DetailLoanController } from './detail_loan.controller';

@Module({
    imports: [GlobalModule],
    controllers: [DetailLoanController],
    providers: [
      ...detailLoanProvider,
      DetailLoanService
    ],
    exports: [
      DetailLoanService
    ]
})
export class DetailLoanModule {}
