import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';

import * as path from 'path';
import { I18nModule, AcceptLanguageResolver, QueryResolver, HeaderResolver } from 'nestjs-i18n';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { GlobalModule } from './global/global.module';
import { MongooseModule } from '@nestjs/mongoose';


import { 
  AdminModule, 
  AuthadminModule, 
  UserModule, 
  AuthuserModule,
} from './mod/index'
import { AdministracionLibroModule } from './src/mod/libro/admin/administracion_libro/administracion_libro.module';
import { AdministracionLibroModule } from './mod/libro/admin/administracion_libro/administracion_libro.module';
import { StockModule } from './mod/libros/admin/stock/stock.module';
import { StockModule } from './mod/book/admin/stock/stock.module';
import { StockModule } from './mod/book/final/stock/stock.module';
import { TagModule } from './mod/book/admin/tag/tag.module';
import { LoanModule } from './mod/book_loan/admin/loan/loan.module';
import { LoanModule } from './mod/book_loan/final/loan/loan.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // MongooseModule.forRoot(process.env.MONGODB), 

    I18nModule.forRoot({
      fallbackLanguage: 'es',
      loaderOptions: {
        path: path.join(__dirname, 'assets/i18n/'),
        watch: true,
      },
      typesOutputPath: path.join(__dirname, '../src/generated/i18n.generated.ts'),
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),

    GlobalModule, 

    AdminModule,
    AuthadminModule,
    UserModule,
    AuthuserModule,
    AdministracionLibroModule,
    StockModule,
    TagModule,
    LoanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

  constructor(){
    // console.log(__dirname, '/i18n/es')
    // console.log(process.env)
  }

}
