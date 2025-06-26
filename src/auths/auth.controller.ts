import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Public } from './decorator/auth.decorator';
import { SignInDto } from './dto/auth.signInDto';

@ApiTags('auths') // Nhóm "Auth" trong Swagger UI
@Controller('auths')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @Get()
  @ApiOperation({ summary: 'Auth Hello' })
  getHello(): string {
    return this.authService.getHello();
  }

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
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Public()
  @Post('signup')
  @ApiOperation({ summary: 'User signup' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 409, description: 'User already exists' })
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }
  @Public()
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile (requires JWT)' })
  getProfile(@Request() req) {
    const { sub, username, role, firstName, lastName } = req.user;
    return {
      id: sub,
      username,
      firstName,
      lastName,
      role,
    };
  }
}
