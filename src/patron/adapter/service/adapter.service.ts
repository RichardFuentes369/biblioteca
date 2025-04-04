import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BookStorage } from '../class/BookStorage';
import { StockService } from '@module/book/stock/stock.service';

@Injectable()
export class AdapterUploadAnyFileBookService {
  constructor(private stockService: StockService) {}

  async cargaDataLibros(optionfile){
    let ruta = '/home/richard/Projects/patrones/biblioteca/src/patron/adapter/data/data.'+optionfile.extension

    const storage = new BookStorage();

    try {
      const books = await storage.processFile(ruta);
      return await this.stockService.almacenamientoMasivo(books);
      // return { message: `Libros procesados exitosamente desde ${optionfile.extension}`, data: books }
    } catch (err) {
        console.log('Error:', err);
        throw new HttpException(
            `Error: ${err.message}`,
            HttpStatus.BAD_REQUEST
        );
    }
  }

}
