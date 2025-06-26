import { IsEnum, IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';
import { TaskStatus } from 'src/tasks/enums/taskstatus.enum';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateSubtaskDto {
  @ApiProperty({ example: 'Implement login', description: 'Title of the subtask' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title: string;

  @ApiProperty({ example: 'Use JWT for authentication', description: 'Detailed description of the subtask' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @ApiPropertyOptional({ enum: TaskStatus, example: TaskStatus.PENDING, description: 'Status of the subtask' })
  @IsEnum(TaskStatus)
  @IsOptional()
  status: TaskStatus;

  @ApiProperty({ example: 1, description: 'ID of the parent task' })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  taskId: number;

  @ApiPropertyOptional({ example: 5, description: 'ID of the user assigned to the subtask' })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  assigneeId: number;
}
