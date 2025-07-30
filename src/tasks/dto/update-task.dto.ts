import { IsEnum, IsOptional, IsString, IsInt, IsDateString, IsUUID } from 'class-validator';
import { TaskStatus } from '../../common/enums/taskstatus.enum';
import { Priority } from '../../common/enums/priority.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';
// import { User } from '../../users/entities/user.entity';
// import { Task } from '../entities/task.entity';

export class UpdateTaskDto {
  @ApiPropertyOptional({ example: 'Updated title' })
  @IsOptional()
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'Updated description' })
  @IsOptional()
  @IsString()
  description: string;

  @ApiPropertyOptional({ enum: TaskStatus, example: TaskStatus.COMPLETED })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiPropertyOptional({ enum: Priority, example: Priority.URGENT })
  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;

  @ApiPropertyOptional({
    example: '2025-07-20T10:00:00.000Z',
    description: 'Due date in ISO format',
  })
  @IsOptional()
  @IsDateString()
  due_date?: Date;

  @ApiPropertyOptional({ example: 5, description: 'User ID assigned to this task' })
  @IsOptional()
  @IsInt()
  user_?: number;

  @ApiPropertyOptional({
    example: '63cccf5b-be63-4c37-ad61-ef114a6761cf',
    description: 'Parent task UUID',
  })
  @IsOptional()
  @IsUUID()
  parent_?: string;
}
