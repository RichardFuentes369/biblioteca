import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { PaginationDto } from '@global/dto/pagination.dto';

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

  async findAll(paginationDto: PaginationDto) {

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
      return await this.userRepository.find({
        skip: page,
        take: limit,
        order: {
          [field]: order
        }
      })
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

  async findOne(id: number) {
    let result = await this.userRepository.findOne({
      where: [ {id : id}],
      order: { id: 'DESC' }
    });

    if (!result) {
      throw new NotFoundException(`No se encontraron registros asociados a la llave ${id} en nuestra base de datos.`);
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
  
  async update(id: number, updateUserDto: UpdateUserDto) {
    const property = await this.userRepository.findOne({
      where: { id }
    });

    if(!property){
      throw new NotFoundException(`No se encontraron registros asociados a la llave ${id} en nuestra base de datos.`);
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
      "id": id, 
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

  async remove(id: number) {
    const property = await this.userRepository.findOne({
      where: { id }
    });

    if(!property){
      throw new NotFoundException(`No se encontraron registros asociados a la llave ${id} en nuestra base de datos.`);
    }

    if(this.userRepository.delete(id)){
      return {
        message: `Usuario con id ${id} eliminado, correctamente`,
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
