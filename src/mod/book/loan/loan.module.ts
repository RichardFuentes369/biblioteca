import { Module } from '@nestjs/common';

import { GlobalModule } from '@global/global.module';
import { loanProvider } from './entities/loan.provider';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';
import { UserModule } from '@module/user/final/user/user.module';
import { StockModule } from '../stock/stock.module';
import { AdminModule } from '@module/user/admin/user/admin.module';

@Module({
    imports: [
      GlobalModule,
      UserModule,
      AdminModule,
      StockModule
    ],
    controllers: [LoanController],
    providers: [
      ...loanProvider,
      LoanService,
    ],
    exports: [
      LoanService
    ]
})
export class LoanModule {}
