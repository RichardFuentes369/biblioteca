import { Stock } from '@module/book/stock/entities/stock.entity';
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BookStorage } from '../class/BookStorage';

@Injectable()
export class AdapterUploadAnyFileBookService {
  constructor(
    @Inject('STOCK_REPOSITORY')
    private stcokReposity: Repository<Stock>,
  ) {}


  async cargaDataLibros(optionfile){
    let ruta = '/home/richard/Projects/patrones/biblioteca/src/patron/adapter/data/data.'+optionfile.extension

    const storage = new BookStorage();

    try {
      const books = await storage.processFile(ruta);
      return { message: 'Libros procesados exitosamente', data: books }
    } catch (err) {
        console.log('Error:', err);
        throw new HttpException(
            `Error: ${err.message}`,
            HttpStatus.BAD_REQUEST
        );
    }
  }

}
