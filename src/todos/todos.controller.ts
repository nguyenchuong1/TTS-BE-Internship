import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Todo } from './entities/todo.entity';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/role.enum';
import { RolesGuard } from '../roles/roles.guard';
import { AuthGuard } from '../auths/auth.guard';
@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth('access_token')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Create a todo' })
  @ApiResponse({ status: 200, description: 'Create', type: [Todo] })
  @ApiBody({ type: CreateTodoDto })
  create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todosService.create(createTodoDto);
  }

  @Roles(Role.Admin)
  @Get()
  @ApiOperation({ summary: 'List all todo' })
  @ApiResponse({ status: 200, description: 'List All in todoApp', type: [CreateTodoDto] })
  async findAll(): Promise<Todo[]> {
    return this.todosService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Find a todo by ID' })
  @ApiResponse({ status: 200, description: 'The found record', type: Todo })
  async findOne(@Param('id') id: number): Promise<Todo> {
    const todo = await this.todosService.findOne(id);
    if (!todo) {
      throw new NotFoundException('Todo not found in the list!');
    } else {
      return todo;
    }
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Update a todolist by ID' })
  @ApiBody({ type: UpdateTodoDto })
  @ApiResponse({ status: 200, description: 'Todo updated' })
  async update(@Param('id') id: number, @Body() updatetodo: UpdateTodoDto): Promise<Todo> {
    return await this.todosService.update(id, updatetodo);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Xóa' })
  @ApiResponse({ status: 200, description: 'Todolist deleted' })
  async delete(@Param('id') id: number): Promise<void> {
    const todo = await this.todosService.findOne(id);
    if (!todo) {
      throw new NotFoundException('Không tìm thấy trong todoApp');
    } else {
      return this.todosService.delete(id);
    }
  }
}
