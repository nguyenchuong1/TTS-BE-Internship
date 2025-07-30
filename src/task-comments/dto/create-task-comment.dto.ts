import { IsNotEmpty, IsOptional, IsString, IsInt, IsUUID } from 'class-validator';

import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskCommentDto {
  @ApiProperty({
    example: 'Chat about something : ex bug?',
    description: 'Comments of member in this task ',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional({
    example: 5,
    description: 'ID of the user assigned to this task',
  })
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  user_id: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'ID of the task (optional)',
    nullable: true,
  })
  @IsOptional()
  @IsUUID()
  task_id?: string;
}
