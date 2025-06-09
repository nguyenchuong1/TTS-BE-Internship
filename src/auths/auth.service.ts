import { Injectable, UnauthorizedException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

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
      if (user?.password !== pass) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = { username: user.username, sub: user.userId };
      return {
        message: 'Sign in successful',
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw error;
    }
  }

  async signup(createUserDto: any) {
    try {
      const existing = await this.usersService.findOne(createUserDto.username);
      if (existing) {
        throw new ConflictException('User already exists');
      }

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const user = await this.usersService.create({
        username: createUserDto.username,
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
