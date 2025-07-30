// import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { Role } from '../roles/role.enum';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;

  const UserData = {
    id: 1,
    username: 'chuong',
    password: 'chuong',
    firstName: 'chuong',
    lastName: 'chuong',
    role: Role.Admin,
  };
  const mockUserService = {
    findOne: jest.fn(),
    create: jest.fn().mockResolvedValue(UserData),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mocked_token'),
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUserService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signup()', () => {
    it('Should reigister successfully and return user', async () => {
      mockUserService.findOne.mockResolvedValueOnce(null);

      const result = await service.signup(UserData);

      expect(mockUserService.findOne).toHaveBeenCalledWith(UserData.username);
      expect(mockUserService.create).toHaveBeenCalledWith(UserData);
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        username: UserData.username,
        sub: UserData.id,
      });
      expect(result).toEqual({
        message: 'Sign up successful',
        access_token: 'mocked_token',
      });
    });

    it('should throw ConflictException if user exists', async () => {
      mockUserService.findOne.mockResolvedValueOnce(UserData);
      await expect(service.signup(UserData)).rejects.toThrow('User already exists');
    });
  });

  describe('Login API', () => {
    it('Should login successfully and return accessToken', async () => {
      mockUserService.findOne = jest.fn().mockResolvedValueOnce(UserData);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      mockJwtService.signAsync = jest.fn().mockResolvedValueOnce('mocked_token');

      const result = await service.signIn('chuong', 'chuong');

      expect(result).toEqual({
        message: 'Sign in successful',
        access_token: 'mocked_token',
      });

      expect(mockUserService.findOne).toHaveBeenCalledWith('chuong');
    });
    it('should throw UnauthorizedException if user not found', async () => {
      mockUserService.findOne.mockResolvedValue(null);
      await expect(service.signIn('chuong', 'chuong')).rejects.toThrow(
        new UnauthorizedException('User not found'),
      );
    });
    it('should throw UnauthorizedException if password does not match', async () => {
      mockUserService.findOne.mockResolvedValue(UserData);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);
      await expect(service.signIn('chuong', 'chuong')).rejects.toThrow(
        new UnauthorizedException('Invalid credentials'),
      );
    });
  });
});
