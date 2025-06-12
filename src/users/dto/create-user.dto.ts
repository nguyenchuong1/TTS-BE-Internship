import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
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
  @ApiProperty({
    example: 'John',
    description: 'First name of the user',
    required: false,
  })
  firstName?: string;
  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the user',
  })
  lastName: string;
}
