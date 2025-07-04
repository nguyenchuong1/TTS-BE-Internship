import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.todosRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    const { title, description, isCompleted } = updateTodoDto;
    if (title === undefined && description === undefined && isCompleted === undefined) {
      throw new BadRequestException('No valid fields provided for update');
    }
    if (typeof title === 'string' && title.trim() !== '') {
      todo.title = title.trim();
    }
    if (typeof description === 'string' && description.trim() !== '') {
      todo.description = description.trim();
    }
    if (isCompleted !== undefined) {
      todo.isCompleted = isCompleted;
    }
    todo.updatedAt = new Date();
    return await this.todosRepository.save(todo);
  }

  async delete(id: number): Promise<void> {
    await this.todosRepository.delete(id);
  }
}
