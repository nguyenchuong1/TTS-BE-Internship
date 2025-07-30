import { IsOptional, IsString, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskCommentDto {
  @ApiPropertyOptional({ example: 'Updated content' })
  @IsOptional()
  @IsString()
  content: string;

  @ApiPropertyOptional({
    example: '2025-07-25T10:00:00.000Z',
    description: 'Date when the task was completed',
  })
  @IsOptional()
  @IsDateString()
  updated_at?: Date;
}
