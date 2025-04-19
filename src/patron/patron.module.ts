import { Module } from '@nestjs/common';

import { AdapterUploadAnyFileBookService as AUAFB } from './adapter/service/adapter.service'
import { BuilderSearchService as BSS } from './builder/service/builder.service'
import { BookLoanAllow as BLA} from './singleton/class/BookLoan'

@Module({
  imports: [
  ],
  controllers: [
  ],
  providers: [
  ],
  exports: [
    AUAFB,
    BSS,
    BLA
  ]
})
export class PatronModule { }
