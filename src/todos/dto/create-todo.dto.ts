import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({ example: 'Buy milk', description: 'Title of the Todo item' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: '2 liters of whole milk',
    required: false,
    description: 'Detailed description (optional)',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: false,
    description: 'Whether the task is completed',
  })
  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;

  @ApiProperty({
    example: '2025-06-11T12:34:56.789Z',
    description: 'Creation timestamp',
    required: false,
  })
  @IsOptional()
  createdAt?: Date;

  @ApiProperty({
    example: '2025-06-11T13:00:00.000Z',
    description: 'Last update timestamp',
    required: false,
  })
  @IsOptional()
  updatedAt?: Date;
}
