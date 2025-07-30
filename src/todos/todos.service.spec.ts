import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateTodoDto } from './dto/update-todo.dto';

describe('TodosService', () => {
  let service: TodosService;
  const mocktodoService = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
  const todoData = {
    id: 1,
    title: 'Test Todo',
    description: 'Testing...',
    isCompleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: getRepositoryToken(Todo),
          useValue: mocktodoService,
        },
      ],
    }).compile();
    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should create todo list', async () => {
      mocktodoService.create.mockReturnValue(todoData);
      mocktodoService.save.mockResolvedValue(todoData);

      const result = await service.create(todoData);
      expect(mocktodoService.create).toHaveBeenCalled();
      expect(mocktodoService.save).toHaveBeenCalled();
      expect(result).toEqual(todoData);
    });
    it('Should throw InternalServerErrorException if create todo list fail', async () => {
      mocktodoService.create.mockResolvedValue(todoData);
      mocktodoService.create.mockImplementation(() => {
        throw new Error('Lỗi khi tạo todo list');
      });
      await expect(service.create(todoData)).rejects.toThrow(InternalServerErrorException);
    });
  });
  describe('findOne()', () => {
    it('should find by id', async () => {
      mocktodoService.findOne.mockResolvedValue(todoData);
      const result = await service.findOne(todoData.id);
      expect(result).toEqual(todoData);
    });
  });

  describe('findAll()', () => {
    it('should return all todo list', async () => {
      mocktodoService.find.mockResolvedValue([todoData]);
      const result = await service.findAll();
      expect(result).toEqual([todoData]);
    });
  });
  describe('update()', () => {
    it('should update and return the updated todo', async () => {
      const updatedData = {
        title: 'Updated Title',
        description: 'Updated Desc',
        isCompleted: true,
      };

      const updatedTodo = {
        ...todoData,
        ...updatedData,
        updatedAt: new Date(),
      };

      mocktodoService.findOne.mockResolvedValue(todoData);
      mocktodoService.save = jest.fn().mockResolvedValue(updatedTodo);

      const result = await service.update(todoData.id, updatedData);
      expect(mocktodoService.findOne).toHaveBeenCalledWith({ where: { id: todoData.id } });
      expect(mocktodoService.save).toHaveBeenCalled();
      expect(result).toEqual(updatedTodo);
    });

    it('should throw NotFoundException if todo not found', async () => {
      mocktodoService.findOne.mockResolvedValue(null);
      await expect(service.update(999, { title: 'Fail' })).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if no valid fields provided', async () => {
      // giả lập todo tồn tại → để nó đi qua đoạn `if (!todo)`
      mocktodoService.findOne.mockResolvedValue({ ...todoData });

      const updateDto: Partial<UpdateTodoDto> = {
        title: '',
        description: '',
        isCompleted: undefined,
      };

      await expect(service.update(todoData.id, updateDto as UpdateTodoDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('delete()', () => {
    it('should delete the todo list', async () => {
      mocktodoService.delete.mockResolvedValue(undefined);
      await service.delete(todoData.id);
      expect(mocktodoService.delete).toHaveBeenCalledWith(todoData.id);
    });
  });
});
