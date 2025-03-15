import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';

import { loanStatus } from './entities/enums/loanStatus';
import { Repository } from 'typeorm';
import { UserService } from '@module/user/final/user/user.service'
import { StockService } from '@module/book/stock/stock.service'
import { Loan } from './entities/loan.entity'

@Injectable()
export class LoanService {

  constructor(
    @Inject('LOAN_REPOSITORY')
    private loadReposity: Repository<Loan>,
    private userService: UserService,
    private stockService: StockService,
  ) {}


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

    const prestamoGuardar = await this.loadReposity.save(createLoanDto)

    let dataMostrar = {
      "id": prestamoGuardar.id, 
      "libro": resultLibroId.result.title, 
      "usuario": resultUserId.result.firstName + ' ' + resultUserId.result.lastName, 
      "email": resultUserId.result.email
    }

    return {
      message: 'Prestamo creado exitosamente',
      result: dataMostrar,
    };

  }
}