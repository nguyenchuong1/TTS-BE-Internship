import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Role } from '../roles/role.enum';
import { NotFoundException } from '@nestjs/common';
import { AuthGuard } from '../auths/auth.guard';
import { RolesGuard } from '../roles/roles.guard';
describe('UsersController', () => {
  let controller: UsersController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: UsersService;

  const mockUser = {
    id: 1,
    username: 'chuong',
    password: 'chuong',
    firstName: 'Chuong',
    lastName: 'Nguyen',
    role: Role.Admin,
    tasks: [],
    subtasks: [],
  };

  const mockUserService = {
    findOne: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockAuthGuard = {
    canActivate: jest.fn(() => true),
  };

  const mockRolesGuard = {
    canActivate: jest.fn(() => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUserService }],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .overrideGuard(RolesGuard)
      .useValue(mockRolesGuard)
      .compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      mockUserService.findOne.mockResolvedValue(mockUser);
      expect(await controller.findOne(1)).toEqual(mockUser);
    });

    it('should throw NotFoundException if user not found', async () => {
      mockUserService.findOne.mockResolvedValue(null);
      await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      mockUserService.findAll.mockResolvedValue([mockUser]);
      expect(await controller.findAll()).toEqual([mockUser]);
    });
  });

  describe('create', () => {
    it('should create a user', async () => {
      mockUserService.create.mockResolvedValue(mockUser);
      expect(await controller.create(mockUser)).toEqual(mockUser);
    });
  });

  describe('update', () => {
    it('should update and return user', async () => {
      mockUserService.update.mockResolvedValue(mockUser);
      expect(await controller.update(1, mockUser)).toEqual(mockUser);
    });

    it('should throw NotFoundException if user not found', async () => {
      mockUserService.update.mockResolvedValue(null);
      await expect(controller.update(999, mockUser)).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete user if found', async () => {
      mockUserService.findOne.mockResolvedValue(mockUser);
      mockUserService.delete.mockResolvedValue(undefined);

      const result = await controller.delete(mockUser.id);

      expect(mockUserService.findOne).toHaveBeenCalledWith(mockUser.id);
      expect(mockUserService.delete).toHaveBeenCalledWith(mockUser.id);
      expect(result).toBeUndefined();
    });

    it('should throw NotFoundException if user not found', async () => {
      mockUserService.findOne.mockResolvedValue(null);
      await expect(controller.delete(999)).rejects.toThrow(NotFoundException);
    });
  });
});
