import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Like, Repository } from 'typeorm';
import { Stock } from './entities/stock.entity';
import { PaginationDto } from '@global/dto/pagination.dto';
import { FilterAnyFieldDto } from '@global/dto/filter-any-field.dto';

@Injectable()
export class StockService {
  constructor(
    @Inject('STOCK_REPOSITORY')
    private stcokReposity: Repository<Stock>,
  ) {}

  listarPropiedadesTabla(T) {
    const metadata = T.metadata;
    return metadata.columns.map((column) => column.propertyName);
  }

  esObjetoVacio(obj) {
    return Object.keys(obj).length === 0;
  }

  async findAll(condicionesWhere: any = null, paginationDto: PaginationDto) {

    const { limit, page, field = 'id' , order = 'Asc' } = paginationDto
    
    if(!paginationDto.page && !paginationDto.limit) throw new NotFoundException(`
      Recuerde que debe enviar los parametros page, limit
    `)

    if(field == '') throw new NotFoundException(`Debe enviar el campo por el que desea filtrar`)
    if(!paginationDto.page) throw new NotFoundException(`Debe enviar el parametro page`)
    if(!paginationDto.limit) throw new NotFoundException(`Debe enviar el parametro limit`)

    if(field != ''){
      const propiedades = this.listarPropiedadesTabla(this.stcokReposity)
      const arratResult = propiedades.filter(obj => obj === field).length
  
      if(arratResult == 0) throw new NotFoundException(`El parametro de busqueda ${field} no existe en la base de datos`)
    }

    const skipeReal = (page == 1) ? 0 : (page - 1) * limit

    const peticion = async (page) => {

      const conditions: any = {
        skip: page,
        take: limit,
        order: {
            [field]: order,
        },
      }

      if(condicionesWhere){
        conditions.where = condicionesWhere
      }

      return await this.stcokReposity.find(
        conditions
      )

    }

    const totalRecords = async () => {
      return await this.stcokReposity.count()
    }

    return {
      "message": "Lista de libros encontrados",
      "result": await peticion(skipeReal),
      "pagination": {
        "page": page,
        "perPage": limit,
        "previou": (page == 1) ? null : page-1,
        "next": (await peticion(page*limit)).length == 0 ? null : page+1,
        "totalRecord": await totalRecords()
      },
      "order":{
        "order": order,
        "field": field
      }
    }
  }

  async findOne(filterAnyFieldDto: FilterAnyFieldDto) {
    let result = await this.stcokReposity.findOne({
      where: [ {id : filterAnyFieldDto.id}],
      order: { id: 'asc' }
    });

    if (!result) {
      throw new NotFoundException(`No se encontraron registros asociados a la llave ${filterAnyFieldDto.id} en nuestra base de datos.`);
    }

    let dataMostrar = {
      "id": result.id, 
      "title": result.title, 
      "author": result.author, 
      "isbn": result.isbn,
      "publisher": result.publisher,
      "year_of_publication": result.year_of_publication,
      "genre": result.genre,
      "size_pages": result.size_pages,
      "inStock": result.inStock,
      "inLoan": result.inLoan,
      "damaged": result.damaged,
      "total": result.total,
      "languague": result.languague,
    }

    return {
      message: 'Libro encontrado',
      result: dataMostrar,
    };

  }

  async filterBooks(filterAnyFieldDto: FilterAnyFieldDto) {

    if(this.esObjetoVacio(filterAnyFieldDto)) throw new NotFoundException(`Recuerde que debe enviar almenos un filtro`)

    const countFields = filterAnyFieldDto.fields.split("|").length
    const countData = filterAnyFieldDto.values.split("|").length

    let arrayFields = filterAnyFieldDto.fields.split("|")
    let arrayData = filterAnyFieldDto.values.split("|")

    if(countFields != countData) throw new NotFoundException(`Error: La cantidad de campos a filtrar ${countFields}, no corresponde con la cantidad de datos a filtrar ${countData}`)

    const whereClause: any = {};

    for (let index = 0; index < arrayFields.length; index++) {
      whereClause[arrayFields[index]] = Like(`%${arrayData[index]}%`);
    }

    return this.findAll(whereClause,filterAnyFieldDto)
    
  }

}
