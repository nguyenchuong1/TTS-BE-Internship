import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, MinLength } from 'class-validator';
import { Role } from '../../roles/role.enum';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'johndoe',
    description: 'Username of the user',
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({
    example: 'securePassword123',
    description: 'Password of the user (will be hashed)',
  })
  @IsOptional()
  @IsString()
  @MinLength(4)
  password?: string;

  @ApiPropertyOptional({
    example: 'John',
    description: 'First name of the user',
  })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({
    example: 'Doe',
    description: 'Last name of the user',
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({
    example: Role.User,
    description: 'Role of the user',
  })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @IsOptional()
  @IsString()
  refresh_token: string;
}
