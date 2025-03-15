import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';

import { loanStatus } from './entities/enums/loanStatus';
import { Like, Repository } from 'typeorm';
import { UserService } from '@module/user/final/user/user.service'
import { StockService } from '@module/book/stock/stock.service'
import { Loan } from './entities/loan.entity'
import { PaginationDto } from '@global/dto/pagination.dto';
import { FilterAnyFieldDto } from '@global/dto/filter-any-field.dto';
import { AdminService } from '@module/user/admin/user/admin.service';

@Injectable()
export class LoanService {

  constructor(
    @Inject('LOAN_REPOSITORY')
    private loadReposity: Repository<Loan>,
    private adminService: AdminService,
    private userService: UserService,
    private stockService: StockService,
  ) {}

  listarPropiedadesTabla(T) {
    const metadata = T.metadata;
    return metadata.columns.map((column) => column.propertyName);
  }

  esObjetoVacio(obj) {
    return Object.keys(obj).length === 0;
  }

  async prestamosHechosPorUsuario(userId: number, type: loanStatus){
    let result = await this.loadReposity.count({
      where: [{
        usuario_final_id: userId,
        type: type
      }],
      order: { id: 'asc' }
    });

    return result
  }
  
  timestampADate = (timestamp) => {
    const fecha = new Date(timestamp * 1000)
    return fecha.toLocaleString()
  }

  async create(createLoanDto: CreateLoanDto) {

    const limiteLibrosPrestamoPorUsuario = process.env.CANTIDAD_LIMITE_DE_PRESTAMO

    let resultUserId = await this.userService.findOne({id: createLoanDto.usuario_final_id})

    if(!resultUserId.result){
      throw new NotFoundException(`No se encontraron registros asociados a la llave ${createLoanDto.usuario_final_id} en nuestra base de datos.`);
    }

    let resultLibroId = await this.stockService.findOne({id: createLoanDto.libro_id})

    if(!resultLibroId.result){
      throw new NotFoundException(`No se encontraron registros asociados a la llave ${createLoanDto.libro_id} en nuestra base de datos.`);
    }
    
    if(resultLibroId.result.inStock == 0){
      throw new NotFoundException(`Lo sentimos, no se puede realizar el prestamos debido a que no hay libros de titulo ${resultLibroId.result.title} disponibles.`);
    }
    
    let cantidadSolicitado = await this.prestamosHechosPorUsuario(resultUserId.result.id, loanStatus.Solicitado)
    let cantidadPrestado = await this.prestamosHechosPorUsuario(resultUserId.result.id, loanStatus.Prestado)
    let cantidadEntregado = await this.prestamosHechosPorUsuario(resultUserId.result.id, loanStatus.Entregado)
    
    
    if(cantidadPrestado >= parseInt(limiteLibrosPrestamoPorUsuario)){
      throw new NotFoundException(`
        Lo sentimos, no se puede realizar la solicitud de prestamo, usted ya alcanzo el limite de prestamos que es de (${parseInt(limiteLibrosPrestamoPorUsuario)}).
        Si necesita el libro ${resultLibroId.result.title} con urgencia, 
        le invitamos a devolver algun libro de los que en este momento tiene y realizar nuevamente la solicitud de prestamo.
      `);
    }

    createLoanDto['fecha_solicitud'] = Math.floor(Date.now() / 1000)

    const prestamoGuardar = await this.loadReposity.save(createLoanDto)

    let dataMostrar = {
      "id": prestamoGuardar.id, 
      "libro": resultLibroId.result.title, 
      "usuario": resultUserId.result.firstName + ' ' + resultUserId.result.lastName, 
      "email": resultUserId.result.email,
      "fecha_creacion": this.timestampADate(prestamoGuardar.fecha_solicitud) 
    }

    return {
      message: 'Prestamo creado exitosamente',
      result: dataMostrar,
    };

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
      const propiedades = this.listarPropiedadesTabla(this.loadReposity)
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

      return await this.loadReposity.find(
        conditions
      )
    }

    const totalRecords = async () => {
      return await this.loadReposity.count()
    }

    return {
      "message": "Lista de solicitudes de prestamos",
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

  async filterSolicitudes(filterAnyFieldDto: FilterAnyFieldDto) {

    if(this.esObjetoVacio(filterAnyFieldDto)) throw new NotFoundException(`Recuerde que debe enviar almenos un filtro`)

    const countFields = filterAnyFieldDto.fields.split("|").length
    const countData = filterAnyFieldDto.values.split("|").length

    let arrayFields = filterAnyFieldDto.fields.split("|")
    let arrayData = filterAnyFieldDto.values.split("|")

    if(countFields != countData) throw new NotFoundException(`Error: La cantidad de campos a filtrar ${countFields}, no corresponde con la cantidad de datos a filtrar ${countData}`)

    const whereClause: any = {};

    
    const propiedades = this.listarPropiedadesTabla(this.loadReposity)
    for (const field of arrayFields) {
      const arratResult = propiedades.filter(obj => obj === field).length
  
      if(arratResult == 0) throw new NotFoundException(`El parametro de busqueda ${field} no existe en la base de datos`)
    }

    for (let index = 0; index < arrayFields.length; index++) {
      whereClause[arrayFields[index]] = Like(`%${arrayData[index]}%`);
    }

    return this.findAll(whereClause,filterAnyFieldDto)
    
  }

  async update(updateLoanDto: UpdateLoanDto){
    const property = await this.loadReposity.findOne({
      where: [{ id: updateLoanDto.id }]
    });

    if(!property){
      throw new NotFoundException(`No se encontraron registros asociados a la llave ${updateLoanDto.id} en nuestra base de datos.`);
    }

    
    let resultUserBibliotecaId = await this.adminService.findOne({id: updateLoanDto.usuario_biblioteca_id})

    if(!resultUserBibliotecaId.result){
      throw new NotFoundException(`No se encontraron registros asociados a la llave ${updateLoanDto.usuario_biblioteca_id} en nuestra base de datos.`);
    }

    await this.loadReposity.save({
      ...property, // existing fields
      ...updateLoanDto // updated fields
    });

    let dataMostrar = {
      "id": updateLoanDto.id, 
      "fecha_prestamo": (updateLoanDto.fecha_prestamo != null) ? updateLoanDto.fecha_prestamo : property.fecha_prestamo, 
      "fecha_entrega": (updateLoanDto.fecha_entrega != null) ? updateLoanDto.fecha_entrega : property.fecha_entrega, 
      "type": updateLoanDto.type,
      "usuario_biblioteca_id": resultUserBibliotecaId.result.id,
    }

    return {
      message: 'Estado prestamo actualizado exitosamente',
      result: dataMostrar,
    };
  }

}