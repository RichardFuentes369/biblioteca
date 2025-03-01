import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { PaginationDto } from '@global/dto/pagination.dto';
import { ApiTags } from '@nestjs/swagger';

import { FinalGuard } from '@guard/final/final.guard';
import { FilterAnyFieldDto } from '@global/dto/filter-any-field.dto';

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
  findOne(@Query() filterAnyFieldDto: FilterAnyFieldDto) {
    return this.userService.findOne(filterAnyFieldDto);
  }
  
  @ApiTags('user')
  @Patch('editar-usuario')
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }
  
  @ApiTags('user')
  @Delete('eliminar-usuario')
  remove(@Query() filterAnyFieldDto: FilterAnyFieldDto) {
    return this.userService.remove(filterAnyFieldDto);
  }
}
