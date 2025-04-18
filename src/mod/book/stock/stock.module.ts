import { Module } from '@nestjs/common';

import { GlobalModule } from '@global/global.module';
import { stokProvider } from './entities/stock.provider';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { AdapterUploadAnyFileBookService as AUAFB } from '@patron/adapter/service/adapter.service';
import { BuilderSearchService as BSS } from '@patron/builder/service/builder.service';

@Module({
    imports: [
      GlobalModule
    ],
    controllers: [StockController],
    providers: [
      ...stokProvider,
      StockService,
      AUAFB,
      BSS
    ],
    exports: [
      StockService
    ]
})
export class StockModule {}
