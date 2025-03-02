import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { PaginationDto } from '@global/dto/pagination.dto';
import { ApiTags } from '@nestjs/swagger';

import { FinalGuard } from '@guard/final/final.guard';
import { FilterAnyFieldDto } from '@global/dto/filter-any-field.dto';
import { FilterForId } from '@global/dto/filter-for-id.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags('user')
  @Post('crear-usuario')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  
  @ApiTags('user')
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.userService.findAll(paginationDto);
  }
  
  @ApiTags('user')
  @Get('obtener-usuario')
  findOne(@Query() filterForId: FilterForId) {
    return this.userService.findOne(filterForId);
  }
  
  @ApiTags('user')
  @Patch('editar-usuario')
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }
  
  @ApiTags('user')
  @Delete('eliminar-usuario')
  remove(@Query() filterForId: FilterForId) {
    return this.userService.remove(filterForId);
  }
}
