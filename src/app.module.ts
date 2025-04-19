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
  StockModule,
  LoanModule,
} from './mod/index'
import { BookLoanAllow } from '@patron/singleton/class/BookLoan';

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
    StockModule,
    LoanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

  constructor(){
    // console.log(__dirname, '/i18n/es')
    // console.log(process.env)
    const configuracionInicial = BookLoanAllow.getInstancia()
    configuracionInicial.setCantidadMaxima(3)
  }


}
