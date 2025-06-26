<<<<<<< week4/dockerize-todo-app
import { IsEnum, IsOptional, IsString, IsInt } from 'class-validator';
import { TaskStatus } from '../enums/taskstatus.enum';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateTaskDto {
  @ApiProperty({ example: 'Buy milk', description: 'Title of the Todo item' })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({ example: 'Buy 2 cartons of milk', description: 'Details of the task' })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ enum: TaskStatus, required: false })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  assigneeId?: number;
}
=======
import { PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
>>>>>>> develop
