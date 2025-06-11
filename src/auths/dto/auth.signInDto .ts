import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({
    example: 'johndoe',
    description: 'Username of the user',
  })
  username: string;
  @ApiProperty({
    example: 'securePassword123',
    description: 'Hashed password of the user',
  })
  password: string;
}