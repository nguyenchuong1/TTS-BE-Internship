import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  getHello(): string {
    return 'Auth Hello Chuong Nguyen!';
  }

  async signIn(username: string, pass: string) {
    try {
      const user = await this.usersService.findOne(username);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const isMatch = await bcrypt.compare(pass, user.password);
      if (!isMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = {
        sub: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      };

      return {
        message: 'Sign in successful',
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      console.error('[SignIn Error]', error);
      throw new UnauthorizedException('Login failed');
    }
  }

  async signup(createUserDto: CreateUserDto) {
    // Tách phần kiểm tra user đã tồn tại ra khỏi try
    const existing = await this.usersService.findOne(createUserDto.username);
    if (existing) {
      throw new ConflictException('User already exists');
    }

    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const user = await this.usersService.create({
        ...createUserDto,
        password: hashedPassword,
      });

      const payload = { username: user.username, sub: user.id };
      return {
        message: 'Sign up successful',
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Signup failed');
    }
  }
}
