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
}
