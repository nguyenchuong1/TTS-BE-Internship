import { IsEnum, IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';
import { TaskStatus } from 'src/tasks/enums/taskstatus.enum';
import { Type } from 'class-transformer';
export class CreateSubtaskDto {
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

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  taskId: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  assigneeId: number;
}
