import { HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { PaginationDto } from '@global/dto/pagination.dto';
import { FilterAnyFieldDto } from '@global/dto/filter-any-field.dto';
import { FilterForId } from '@global/dto/filter-for-id.dto';

@Injectable()
export class AdminService {
  constructor(
    @Inject('ADMIN_REPOSITORY')
    private adminRepository: Repository<Admin>,
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
      const propiedades = this.listarPropiedadesTabla(this.adminRepository)
      const arratResult = propiedades.filter(obj => obj === field).length
  
      if(arratResult == 0) throw new NotFoundException(`El parametro de busqueda ${field} no existe en la base de datos`)
    }

    const skipeReal = (page == 1) ? 0 : (page - 1) * limit

    const peticion = async (page) => {
      return await this.adminRepository.find({
        skip: page,
        take: limit,
        order: {
          [field]: order
        }
      })
    }

    const totalRecords = async () => {
      return await this.adminRepository.count()
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
    let result = await this.adminRepository.findOne({
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

  async create(createAdminDto: CreateAdminDto) {

    const encontrarCorreo = await this.findUsernameEmail(createAdminDto.email)

    if(encontrarCorreo) throw new NotFoundException(`Este correo ${createAdminDto.email}, ya esta registrado en nuestra base de datos`)

    const usuarioGuardado = await this.adminRepository.save(createAdminDto)

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

  async update(updateAdminDto: UpdateAdminDto) {
    const property = await this.adminRepository.findOne({
      where: [{ id: updateAdminDto.id }]
    });

    if(!property){
      throw new NotFoundException(`No se encontraron registros asociados a la llave ${updateAdminDto.id} en nuestra base de datos.`);
    }

    if(updateAdminDto.email){
      if(updateAdminDto.email != property.email){
  
        let concidencia = await this.adminRepository.findOne({
          where: [ {email : updateAdminDto.email}]
        });
        
        if(concidencia) throw new NotFoundException(`El correo que esta intentando actualizar ya existe en nuestra base de datos`)
        
      }
    }

    await this.adminRepository.save({
      ...property, // existing fields
      ...updateAdminDto // updated fields
    });

    let dataMostrar = {
      "id": updateAdminDto.id, 
      "firstName": updateAdminDto.firstName, 
      "lastName": updateAdminDto.lastName, 
      "email": updateAdminDto.email,
      "password": "***************",
    }

    return {
      message: 'Usuario actualizado exitosamente',
      result: dataMostrar,
    };
  }

  async remove(filterForId: FilterForId) {
    const property = await this.adminRepository.findOne({
      where: [ {id : filterForId.id}]
    });

    if(!property){
      throw new NotFoundException(`No se encontraron registros asociados a la llave ${filterForId.id} en nuestra base de datos.`);
    }

    if(this.adminRepository.delete(filterForId.id)){
      return {
        message: `Usuario con id ${filterForId.id} eliminado, correctamente`,
        result: [],
      };
    }
  }

  async findUsernameEmail(username: string): Promise<Admin>{
    return this.adminRepository.findOne({
      where: [ {email : username}]
    });
  }
}
