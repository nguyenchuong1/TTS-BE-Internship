import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
  IsDateString,
  IsUUID,
} from 'class-validator';
import { TaskStatus } from 'src/common/enums/taskstatus.enum';
import { Priority } from 'src/common/enums/priority.enum';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Buy milk',
    description: 'Title of the task',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Buy 2 cartons of milk',
    description: 'Detailed description of the task',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({
    enum: TaskStatus,
    example: TaskStatus.PENDING,
    description: 'Current status of the task',
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @ApiPropertyOptional({
    enum: Priority,
    example: Priority.MEDIUM,
    description: 'Priority level of the task',
  })
  @IsEnum(Priority)
  @IsOptional()
  priority?: Priority;

  @ApiPropertyOptional({
    example: '2025-07-15T18:00:00.000Z',
    description: 'Due date in ISO format (optional)',
  })
  @IsDateString()
  @IsOptional()
  due_date?: Date;

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
    description: 'ID of the parent task (optional)',
    nullable: true,
  })
  @IsOptional()
  @IsUUID()
  parent_id?: string;
}
