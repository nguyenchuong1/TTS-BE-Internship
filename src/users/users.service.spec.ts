import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from '../roles/role.enum';
import { InternalServerErrorException } from '@nestjs/common';

jest.mock('bcrypt');

describe('UsersService', () => {
  let service: UsersService;

  const mockUsersService = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const userData = {
    id: 1,
    username: 'chuong',
    password: 'chuong',
    firstName: 'Chuong',
    lastName: 'Nguyen',
    role: Role.Admin,
  } as User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should hash password and create user', async () => {
      (bcrypt.hash as jest.Mock).mockResolvedValue('chuong');
      mockUsersService.create.mockReturnValue(userData);
      mockUsersService.save.mockResolvedValue(userData);

      const result = await service.create(userData);

      expect(bcrypt.hash).toHaveBeenCalled();
      expect(mockUsersService.create).toHaveBeenCalled();
      expect(mockUsersService.save).toHaveBeenCalled();
      expect(result).toEqual(userData);
    });
    it('Should throw InternalServerErrorException if create user fail', async () => {
      (bcrypt.hash as jest.Mock).mockResolvedValue(false);
      mockUsersService.create.mockResolvedValue(userData);
      mockUsersService.create.mockImplementation(() => {
        throw new Error('Lỗi khi tạo user');
      });
      await expect(service.create(userData)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('findOne()', () => {
    it('should find by id', async () => {
      mockUsersService.findOne.mockResolvedValue(userData);
      const result = await service.findOne(1);
      expect(result).toEqual(userData);
    });

    it('should find by username', async () => {
      mockUsersService.findOne.mockResolvedValue(userData);
      const result = await service.findOne(userData.username);
      expect(result).toEqual(userData);
    });
  });

  describe('findAll()', () => {
    it('should return all users', async () => {
      mockUsersService.find.mockResolvedValue([userData]);
      const result = await service.findAll();
      expect(result).toEqual([userData]);
    });
  });

  describe('update()', () => {
    it('should hash password if provided and update user', async () => {
      (bcrypt.hash as jest.Mock).mockResolvedValue('chuong');
      mockUsersService.update.mockResolvedValue(undefined);
      mockUsersService.findOne.mockResolvedValue(userData);

      const result = await service.update(1, {
        username: 'chuong',
        password: '1234',
      });

      expect(bcrypt.hash).toHaveBeenCalled();
      expect(mockUsersService.update).toHaveBeenCalledWith(1, {
        username: 'chuong',
        password: 'chuong',
      });
      expect(result).toEqual(userData);
    });
  });

  describe('delete()', () => {
    it('should delete the user', async () => {
      mockUsersService.delete.mockResolvedValue(undefined);
      await service.delete(1);
      expect(mockUsersService.delete).toHaveBeenCalledWith(1);
    });
  });
});
