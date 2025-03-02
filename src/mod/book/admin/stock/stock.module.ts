import { Module } from '@nestjs/common';

import { GlobalModule } from '@global/global.module';
import { stokProvider } from './entities/stock.provider';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';

@Module({
    imports: [GlobalModule],
    controllers: [StockController],
    providers: [
      ...stokProvider,
      StockService
    ],
    exports: [
      StockService
    ]
})
export class StockModule {}
