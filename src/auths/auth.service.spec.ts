import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: Partial<UsersService>;
  let jwtService: Partial<JwtService>;

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
      const user = { userId: 1, username: 'john', password: 'changeme' };
      (usersService.findOne as jest.Mock).mockResolvedValue(user);
      (jwtService.signAsync as jest.Mock).mockResolvedValue('token123');

      const result = await service.signIn('john', 'changeme');
      expect(result).toEqual({
        message: 'Sign in successful',
        access_token: 'token123',
      });
    });

    it('should throw UnauthorizedException if password is incorrect', async () => {
      const user = { userId: 1, username: 'john', password: 'wrongpass' };
      (usersService.findOne as jest.Mock).mockResolvedValue(user);

      await expect(service.signIn('john', 'changeme')).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if user not found', async () => {
      (usersService.findOne as jest.Mock).mockResolvedValue(null);

      await expect(service.signIn('john', 'changeme')).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('signup', () => {
    it('should sign up a new user', async () => {
      (usersService.findOne as jest.Mock).mockResolvedValue(null);
      (usersService.create as jest.Mock).mockImplementation(async (data) => ({
        id: 1,
        username: data.username,
        password: data.password,
      }));
      (jwtService.sign as jest.Mock).mockReturnValue('signed_token');

      const dto = { username: 'john', password: 'changeme' };
      const result = await service.signup(dto);

      expect(result).toEqual({
        message: 'Sign up successful',
        access_token: 'signed_token',
      });
    });

    it('should throw ConflictException if user already exists', async () => {
      (usersService.findOne as jest.Mock).mockResolvedValue({ username: 'john' });

      await expect(service.signup({ username: 'john', password: 'changeme' }))
        .rejects.toThrow(ConflictException);
    });
  });
});
