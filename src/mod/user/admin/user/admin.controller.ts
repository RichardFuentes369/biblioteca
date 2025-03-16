import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

import { PaginationDto } from '@global/dto/pagination.dto';

import { AdminGuard } from '@guard/admin/admin.guard';
import { ApiTags } from '@nestjs/swagger';
import { FilterAnyFieldDto } from '../../../../global/dto/filter-any-field.dto';
import { FilterForId } from '@global/dto/filter-for-id.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiTags('admin')
  @Post('crear-administrador')
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }
  
  @ApiTags('admin')
  @Get('lista')
  // @UseGuards(AdminGuard)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.adminService.findAll('', paginationDto);
  }

  @ApiTags('admin')
  @Get('obtener-administrador')
  findOne(@Query() filterForId: FilterForId) {
    return this.adminService.findOne(filterForId);
  }

  @ApiTags('admin')
  @Get('filtro-administrador')
  filterAdmins(@Query() filterAnyFieldDto: FilterAnyFieldDto) {
    return this.adminService.filterAdmins(filterAnyFieldDto);
  }

  @ApiTags('admin')
  @Patch('editar-administrador')
  update(@Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(updateAdminDto);
  }

  @ApiTags('admin')
  @Delete('eliminar-admininistrador')
  remove(@Query() filterForId: FilterForId) {
    return this.adminService.remove(filterForId);
  }
}
