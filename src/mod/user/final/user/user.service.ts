import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { Like, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { PaginationDto } from '@global/dto/pagination.dto';
import { FilterAnyFieldDto } from '@global/dto/filter-any-field.dto';
import { FilterForId } from '@global/dto/filter-for-id.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
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
      const propiedades = this.listarPropiedadesTabla(this.userRepository)
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

      return await this.userRepository.find(
        conditions
      )
    }

    const totalRecords = async () => {
      return await this.userRepository.count()
    }

    return {
      "message": "Lista de usuarios encontrados",
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

  async findOne(filterForId: FilterForId) {
    let result = await this.userRepository.findOne({
      where: [ {id : filterForId.id}],
      order: { id: 'asc' }
    });

    if (!result) {
      throw new NotFoundException(`No se encontraron registros asociados a la llave ${filterForId.id} en nuestra base de datos.`);
    }

    let dataMostrar = {
      "id": result.id, 
      "firstName": result.firstName, 
      "lastName": result.lastName, 
      "email": result.email,
      "password": "***************",
    }

    return {
      message: 'Usuario encontrado',
      result: dataMostrar,
    };

  }
  
  async filterUsers(filterAnyFieldDto: FilterAnyFieldDto) {

    if(this.esObjetoVacio(filterAnyFieldDto)) throw new NotFoundException(`Recuerde que debe enviar almenos un filtro`)

    const countFields = filterAnyFieldDto.fields.split("|").length
    const countData = filterAnyFieldDto.values.split("|").length

    let arrayFields = filterAnyFieldDto.fields.split("|")
    let arrayData = filterAnyFieldDto.values.split("|")

    if(countFields != countData) throw new NotFoundException(`Error: La cantidad de campos a filtrar ${countFields}, no corresponde con la cantidad de datos a filtrar ${countData}`)

    const whereClause: any = {};

    
    const propiedades = this.listarPropiedadesTabla(this.userRepository)
    for (const field of arrayFields) {
      const arratResult = propiedades.filter(obj => obj === field).length
  
      if(arratResult == 0) throw new NotFoundException(`El parametro de busqueda ${field} no existe en la base de datos`)
    }

    for (let index = 0; index < arrayFields.length; index++) {
      whereClause[arrayFields[index]] = Like(`%${arrayData[index]}%`);
    }

    return this.findAll(whereClause,filterAnyFieldDto)
    
  }

  async create(createUserDto: CreateUserDto) {
    
    const encontrarCorreo = await this.findUsernameEmail(createUserDto.email)

    if(encontrarCorreo) throw new NotFoundException(`Este correo ${createUserDto.email}, ya esta registrado en nuestra base de datos`)
    
    const usuarioGuardado = await this.userRepository.save(createUserDto)

    let dataMostrar = {
      "id": usuarioGuardado.id, 
      "firstName": usuarioGuardado.firstName, 
      "lastName": usuarioGuardado.lastName, 
      "email": usuarioGuardado.email,
      "password": "***************",
    }

    return {
      message: 'Usuario creado exitosamente',
      result: dataMostrar,
    };
  }
  
  async update(updateUserDto: UpdateUserDto) {
    const property = await this.userRepository.findOne({
      where: [{ id: updateUserDto.id }]
    });

    if(!property){
      throw new NotFoundException(`No se encontraron registros asociados a la llave ${updateUserDto.id} en nuestra base de datos.`);
    }

    if(updateUserDto.email){
      if(updateUserDto.email != property.email){
  
        let concidencia = await this.userRepository.findOne({
          where: [ {email : updateUserDto.email}]
        });
        
        if(concidencia) throw new NotFoundException(`El correo que esta intentando actualizar ya existe en nuestra base de datos`)
        
      }
    }

    await this.userRepository.save({
      ...property, // existing fields
      ...updateUserDto // updated fields
    });

    let dataMostrar = {
      "id": updateUserDto.id, 
      "firstName": updateUserDto.firstName, 
      "lastName": updateUserDto.lastName, 
      "email": updateUserDto.email,
      "password": "***************",
    }

    return {
      message: 'Usuario actualizado exitosamente',
      result: dataMostrar,
    };
  }

  async remove(filterForId: FilterForId) {
    const property = await this.userRepository.findOne({
      where: [{ id: filterForId.id }]
    });

    if(!property){
      throw new NotFoundException(`No se encontraron registros asociados a la llave ${filterForId.id} en nuestra base de datos.`);
    }

    if(this.userRepository.delete(filterForId.id)){
      return {
        message: `Usuario con id ${filterForId.id} eliminado, correctamente`,
        result: [],
      };
    }
  }

  async findUsernameEmail(username: string): Promise<User>{
    return this.userRepository.findOne({
      where: [ {email : username}]
    });
  }
}
