import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/auth.signInDto';
import { Role } from '../roles/role.enum';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    signIn: jest.fn(),
    signup: jest.fn(),
  };
  const Userdata = {
    username: 'chuong',
    password: 'chuong',
    firstName: 'Chuong',
    lastName: 'Nguyen',
    role: Role.Admin,
  };
  const dto: SignInDto = {
    username: 'chuong',
    password: 'chuong',
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signIn', () => {
    it('should call authService.signIn with correct credentials and return token', async () => {
      const mockResult = {
        message: 'Sign in successful',
        access_token: 'mocked_token',
      };

      mockAuthService.signIn.mockResolvedValue(mockResult);

      const result = await controller.signIn(Userdata);

      expect(mockAuthService.signIn).toHaveBeenCalledWith(dto.username, dto.password);
      expect(result).toEqual(mockResult);
    });
  });

  describe('signup', () => {
    it('should call authService.signup and return result', async () => {
      const mockResult = {
        message: 'Sign up successful',
        access_token: 'mocked_token',
      };

      mockAuthService.signup.mockResolvedValue(mockResult);

      const result = await controller.signup(Userdata);

      expect(mockAuthService.signup).toHaveBeenCalledWith(Userdata);
      expect(result).toEqual(mockResult);
    });
  });
});
