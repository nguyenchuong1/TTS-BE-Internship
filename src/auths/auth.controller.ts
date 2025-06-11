import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorator/auth.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
        username: { type: 'string', example: 'john@gmail.com' },
        password: { type: 'string', example: 'changeme' },
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
    return req.user;
  }
}
