import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { StockService } from '@module/book/stock/stock.service';
import { SearchBookBuilder } from '../class/SearchBookBuilder';
import { FilterBookDto } from '@module/book/stock/dto/filter-book.dto';

@Injectable()
export class BuilderSearchService {
    constructor(private stockService: StockService) { }

    async busquedaLibro(query: FilterBookDto) {
        try {

            const search = new SearchBookBuilder();

            if(query.title){
                search.conTitulo(query.title)
            }
            if(query.publisher){
                search.conEditorial(query.publisher)
            }
            if(query.author){
                search.conAutor(query.author)
            }
            if(query.year_of_publication){
                search.conAnhoPublicacion(query.year_of_publication)
            }
            if(query.genre){
                search.conGenero(query.genre)
            }            
            if(query.isbn){
                search.conISBN(query.isbn)
            }
            if(query.inStock){
                search.conStock(query.inStock)
            }
            if(query.inLoan){
                search.conPrestamo(query.inLoan)
            }
            if(query.damaged){
                search.conDanho(query.damaged)
            }
            if(query.total){
                search.conCantidadLibros(query.total)
            }
            if(query.size_pages){
                search.conCantidadPaginas(query.size_pages)
            }
            if(query.language){
                search.conIdioma(query.language)
            }            
            if(query.limit){
                search.conLimit(query.limit)
            }            
            if(query.page){
                search.conPage(query.page)
            }
            if(query.order){
                search.conOrder(query.order)
            }            
            if(query.field){
                search.conField(query.field)
            }            

            const result = await this.stockService.findAllWithFilters(query)

            return result

        } catch (err) {
            console.log('Error:', err);
            throw new HttpException(
                `Error: ${err.message}`,
                HttpStatus.BAD_REQUEST
            );
        }
    }

}
