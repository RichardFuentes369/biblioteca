import { Module } from '@nestjs/common';

import { AdapterUploadAnyFileBookService as AUAFB } from './adapter/service/adapter.service'
import { BuilderSearchService as BSS } from './builder/service/builder.service'

@Module({
  imports: [
  ],
  controllers: [
  ],
  providers: [
  ],
  exports: [
    AUAFB,
    BSS
  ]
})
export class PatronModule { }
