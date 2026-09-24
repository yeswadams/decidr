import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import {
  CreateUserDto,
  ListAllEntities,
  updateUserDto,
} from '../auth/dtos/createUser.dto.js';

@Controller('users')
export class CatsController {
  @Post()
  create(@Body() CreateUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  @Get()
  findAll(@Query() query: ListAllEntities) {
    return `This action returns all users (limit: ${query.limit} users)`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action return user of id: ${id}`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: updateUserDto) {
    return `This updates data of the id: ${id}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action will delete the user of id: ${id}`
  }
}
