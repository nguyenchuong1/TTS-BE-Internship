import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

const mockTodo: Todo = {
  id: 1,
  title: 'Test Todo',
  description: 'Testing...',
  isCompleted: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('TodosService', () => {
  let service: TodosService;
  let repo: {
    create: jest.Mock;
    save: jest.Mock;
    find: jest.Mock;
    findOne: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
  };

  beforeEach(async () => {
    repo = {
      create: jest.fn(() => mockTodo),
      save: jest.fn(() => Promise.resolve(mockTodo)),
      find: jest.fn(() => Promise.resolve([mockTodo])),
      findOne: jest.fn(() => Promise.resolve(mockTodo)),
      update: jest.fn(() => Promise.resolve(undefined)),
      delete: jest.fn(() => Promise.resolve(undefined)),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: getRepositoryToken(Todo),
          useValue: repo,
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a todo', async () => {
    const dto: CreateTodoDto = { title: 'Test', description: 'Test desc' };
    const result = await service.create(dto);
    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalledWith(mockTodo);
    expect(result).toEqual(mockTodo);
  });

  it('should return all todos', async () => {
    const result = await service.findAll();
    expect(repo.find).toHaveBeenCalled();
    expect(result).toEqual([mockTodo]);
  });

  it('should return a single todo', async () => {
    const result = await service.findOne(1);
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(mockTodo);
  });

  it('should update a todo', async () => {
    const dto: UpdateTodoDto = { title: 'Updated Title' };
    const result = await service.update(1, dto);
    expect(repo.update).toHaveBeenCalledWith(1, dto);
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(mockTodo);
  });

  it('should delete a todo', async () => {
    await service.delete(1);
    expect(repo.delete).toHaveBeenCalledWith(1);
  });
});
