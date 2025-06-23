import { IsEnum, IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';
import { TaskStatus } from '../enums/taskstatus.enum';
import { Type } from 'class-transformer';
export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status: TaskStatus;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  assigneeId: number;
}
