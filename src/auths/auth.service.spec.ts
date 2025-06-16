import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { Role } from '../roles/role.enum';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let usersService: Partial<Record<keyof UsersService, jest.Mock>>;
  let jwtService: Partial<Record<keyof JwtService, jest.Mock>>;

  beforeEach(async () => {
    usersService = {
      findOne: jest.fn(),
      create: jest.fn(),
    };

    jwtService = {
      signAsync: jest.fn(),
      sign: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    it('should sign in with valid credentials', async () => {
      const mockUser = {
        id: 3,
        username: 'chuong',
        password: 'chuong',
        firstName: 'chuong',
        lastName: 'chuong',
        role: Role.Admin,
      };

      usersService.findOne?.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      jwtService.signAsync?.mockResolvedValue('token123');

      const result = await service.signIn('chuong', 'chuong');

      expect(result).toEqual({
        message: 'Sign in successful',
        access_token: 'token123',
      });
      expect(usersService.findOne).toHaveBeenCalledWith('chuong');
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        sub: mockUser.id,
        username: mockUser.username,
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        role: mockUser.role,
      });
    });

    it('should throw UnauthorizedException if password is incorrect', async () => {
      const mockUser = {
        id: 2,
        username: 'admin',
        password: 'hashed_password',
      };

      usersService.findOne?.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.signIn('admin', 'wrong')).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if user not found', async () => {
      usersService.findOne?.mockResolvedValue(null);
      await expect(service.signIn('john', 'changeme')).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('signup', () => {
    it('should sign up a new user', async () => {
      const dto = {
        username: 'hello',
        password: 'plain_password',
        firstName: 'Ngáo',
        lastName: 'Khùng',
        role: Role.User,
      };

      usersService.findOne?.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password');
      usersService.create?.mockResolvedValue({
        id: 1,
        ...dto,
        password: 'hashed_password',
      });
      jwtService.sign?.mockReturnValue('signed_token');

      const result = await service.signup(dto);

      expect(result).toEqual({
        message: 'Sign up successful',
        access_token: 'signed_token',
      });
      expect(usersService.findOne).toHaveBeenCalledWith('hello');
      expect(usersService.create).toHaveBeenCalledWith({
        ...dto,
        password: 'hashed_password',
      });
    });

    it('should throw ConflictException if user already exists', async () => {
      usersService.findOne?.mockResolvedValue({ username: 'chuong' });

      await expect(
        service.signup({
          username: 'chuong',
          password: 'chuong',
          firstName: 'chuong',
          lastName: 'chuong',
          role: Role.User,
        }),
      ).rejects.toThrow(ConflictException);
    });
  });
});
