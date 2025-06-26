import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auths/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
<<<<<<< week4/dockerize-todo-app
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
=======
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
>>>>>>> develop
import { User } from './entities/user.entity';
import { Role } from 'src/roles/role.enum';
import { Roles } from '../roles/roles.decorator';
@UseGuards(AuthGuard, RolesGuard)
<<<<<<< week4/dockerize-todo-app
@ApiBearerAuth('access_token')
=======
>>>>>>> develop
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @Roles(Role.Admin, Role.User)
  @ApiOperation({ summary: 'find id' })
  @ApiResponse({ status: 200, description: 'user found' })
  async findOne(@Param('id') id: number): Promise<User> {
    const find_user = await this.usersService.findOne(id);
    if (!find_user) {
      throw new NotFoundException('User not found');
    } else {
      return find_user;
    }
  }

  @Get()
  @Roles(Role.Admin, Role.User)
  @ApiOperation({ summary: 'Find all user in database' })
  @ApiResponse({ status: 200, description: 'List All in todoApp' })
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Post()
  @Roles(Role.Admin)
<<<<<<< week4/dockerize-todo-app
  @ApiResponse({ status: 200, description: 'Create user' })
=======
  @ApiResponse({ status: 200, description: 'Create', type: [User] })
>>>>>>> develop
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.User)
<<<<<<< week4/dockerize-todo-app
  @ApiOperation({ summary: 'Update user' })
=======
  @ApiOperation({ summary: 'Update ' })
>>>>>>> develop
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'User has been updated' })
  async update(@Param('id') id: number, @Body() updateuser: UpdateUserDto): Promise<User | null> {
    const user = await this.usersService.update(id, updateuser);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found!`);
    } else {
      return user;
    }
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, description: 'User deleted!' })
  async delete(@Param('id') id: number): Promise<void> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('Not found user in database!');
    } else {
      return this.usersService.delete(id);
    }
  }
}
