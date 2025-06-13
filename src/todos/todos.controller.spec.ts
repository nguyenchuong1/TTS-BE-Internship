import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { NotFoundException } from '@nestjs/common';

const mockTodo: Todo = {
  id: 1,
  title: 'Test Todo',
  description: 'Testing...',
  isCompleted: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('TodosController', () => {
  let controller: TodosController;
  let service: {
    create: jest.Mock;
    findAll: jest.Mock;
    findOne: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
  };

  beforeEach(async () => {
    service = {
      create: jest.fn(() => Promise.resolve(mockTodo)),
      findAll: jest.fn(() => Promise.resolve([mockTodo])),
      findOne: jest.fn((id: number) => Promise.resolve(id === 1 ? mockTodo : null)),
      update: jest.fn((id: number, dto: UpdateTodoDto) => {
        // dùng dto để tránh lỗi eslint
        void dto; // hoặc có thể dùng: if (dto) {}
        return Promise.resolve(id === 1 ? mockTodo : null);
      }),
      delete: jest.fn(() => Promise.resolve(undefined)),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [{ provide: TodosService, useValue: service }],
    }).compile();

    controller = module.get<TodosController>(TodosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a todo', async () => {
    const dto: CreateTodoDto = { title: 'Test', description: 'Test desc' };
    const result = await controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(mockTodo);
  });

  it('should return all todos', async () => {
    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([mockTodo]);
  });

  it('should return one todo by id', async () => {
    const result = await controller.findOne(1);
    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockTodo);
  });

  it('should throw if todo not found (findOne)', async () => {
    await expect(controller.findOne(999)).rejects.toThrow('Không tìm thấy trong danh sách!');
  });

  it('should update a todo', async () => {
    const updateDto: UpdateTodoDto = { title: 'Updated' };
    const result = await controller.update(1, updateDto);
    expect(service.update).toHaveBeenCalledWith(1, updateDto);
    expect(result).toEqual(mockTodo);
  });

  it('should throw if todo not found (update)', async () => {
    const updateDto: UpdateTodoDto = { title: 'Nothing' };
    await expect(controller.update(999, updateDto)).rejects.toThrow(
      new NotFoundException('Todo with id 999 not found!'),
    );
  });

  it('should delete a todo', async () => {
    const result = await controller.delete(1);
    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(service.delete).toHaveBeenCalledWith(1);
    expect(result).toBeUndefined();
  });

  it('should throw if todo not found (delete)', async () => {
    service.findOne = jest.fn(() => Promise.resolve(null)); // simulate not found
    await expect(controller.delete(999)).rejects.toThrow('Không tìm thấy trong todoApp');
  });
});
