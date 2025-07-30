import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { SignInDto } from './dto/auth.signInDto';
import { SignUpDto } from './dto/auth.signUpDto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(signIn: SignInDto): Promise<any> {
    const user = await this.userRepository.findOne({ where: { username: signIn.username } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const checkPass = await bcrypt.compare(signIn.password, user.password);
    if (!checkPass) {
      throw new HttpException('Password is not correct', HttpStatus.UNAUTHORIZED);
    }

    const payload = {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };
    return this.generateToken(payload);
  }

  async Register(signUpDTO: SignUpDto): Promise<User> {
    const existing = await this.userRepository.findOne({
      where: { username: signUpDTO.username },
    });
    if (existing) {
      throw new ConflictException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(signUpDTO.password, 10);
    return await this.userRepository.save({
      ...signUpDTO,
      password: hashedPassword,
    });
  }
  private async generateToken(payload: { id: number; username: string }) {
    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.EXP_IN_REFRESH_TOKEN,
    });
    await this.userRepository.update(
      { username: payload.username },
      { refresh_token: refresh_token },
    );
    return { access_token, refresh_token };
  }

  async refreshToken(refresh_token: string): Promise<any> {
    try {
      const verify = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      const checkExistToken = await this.userRepository.findOneBy({
        username: verify.username,
        refresh_token,
      });
      if (checkExistToken) {
        const payload = {
          id: verify.id,
          username: verify.username,
          firstName: verify.firstName,
          lastName: verify.lastName,
          role: verify.role,
        };
        return this.generateToken(payload);
      } else {
        throw new HttpException('Refresh token is not valid', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException('Refresh token is not valid', error);
    }
  }
}
