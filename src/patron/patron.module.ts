import { Module } from '@nestjs/common';

import { AdapterUploadAnyFileBookService as AUAFB } from './adapter/service/adapter.service'

@Module({
  imports: [
  ],
  controllers: [
  ],
  providers: [
  ],
  exports: [
    AUAFB
  ]
})
export class PatronModule { }
