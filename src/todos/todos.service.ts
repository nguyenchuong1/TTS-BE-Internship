import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todosRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    try {
      const todo = this.todosRepository.create(createTodoDto);
      return await this.todosRepository.save(todo);
    } catch (error) {
      console.error('Error when create Todolist:', error);
      throw new InternalServerErrorException('Failed to create Todo');
    }
  }

  async findAll(): Promise<Todo[]> {
    return await this.todosRepository.find();
  }

  async findOne(id: number): Promise<Todo | null> {
    return await this.todosRepository.findOne({ where: { id } });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo | null> {
    await this.todosRepository.update(id, updateTodoDto);
    return await this.todosRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.todosRepository.delete(id);
  }
}
