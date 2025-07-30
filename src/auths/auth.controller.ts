import { Body, Controller, HttpCode, HttpStatus, Post, Request } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './decorator/auth.decorator';
import { SignInDto } from './dto/auth.signInDto';
import { SignUpDto } from './dto/auth.signUpDto';
import { User } from 'src/users/entities/user.entity';

@ApiTags('auths') // Nhóm "Auth" trong Swagger UI
@Controller('auths')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'chuong' },
        password: { type: 'string', example: 'chuong' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  signIn(@Body() signInDto: SignInDto): Promise<any> {
    console.log('login api');
    console.log(signInDto);
    return this.authService.signIn(signInDto);
  }

  @Public()
  @Post('signup')
  @ApiOperation({ summary: 'User signup' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 409, description: 'User already exists' })
  async register(@Body() signUp: SignUpDto): Promise<User> {
    console.log('register api');
    console.log(signUp);
    const test = await this.authService.Register(signUp);
    console.log(test);
    return test;
  }

  @Public()
  @Post('refresh-token')
  @ApiOperation({ summary: 'User signup' })
  @ApiResponse({ status: 201, description: 'Re-Refresh_token created successfully' })
  @ApiResponse({ status: 401, description: 'Re-Refresh_token already exists' })
  refreshToken(@Body() { refresh_token }): Promise<any> {
    console.log('refresh token api');
    return this.authService.refreshToken(refresh_token);
  }
}
