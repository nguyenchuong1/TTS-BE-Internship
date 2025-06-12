import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Todo } from './entities/todo.entity';
import { Public } from 'src/auths/decorator/auth.decorator';
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Create a new todolist' })
  @ApiBody({ type: CreateTodoDto })
  create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todosService.create(createTodoDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'List all todo' })
  @ApiResponse({ status: 200, description: 'List All in todoApp', type: [CreateTodoDto] })
  async findAll(): Promise<Todo[]> {
    return await this.todosService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Find a todo by ID' })
  @ApiResponse({ status: 200, description: 'The found record', type: Todo })
  async findOne(@Param('id') id: number): Promise<Todo> {
    const todo = await this.todosService.findOne(id);
    if (!todo) {
      throw new Error('Không tìm thấy trong danh sách!');
    } else {
      return todo;
    }
  }

  @Public()
  @Patch(':id')
  @ApiOperation({ summary: 'Update a todolist by ID' })
  @ApiBody({ type: UpdateTodoDto })
  @ApiResponse({ status: 200, description: 'Todo updated' })
  async update(@Param('id') id: number, @Body() updatetodo: UpdateTodoDto): Promise<Todo | null> {
    const todo = await this.todosService.update(id, updatetodo);
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found!`);
    } else {
      return todo;
    }
  }

  @Public()
  @Delete(':id')
  @ApiOperation({ summary: 'Xóa' })
  @ApiResponse({ status: 200, description: 'Todolist deleted' })
  async delete(@Param('id') id: number): Promise<void> {
    const todo = await this.todosService.findOne(id);
    if (!todo) {
      throw new Error('Không tìm thấy trong todoApp');
    } else {
      return await this.todosService.delete(id);
    }
  }
}
