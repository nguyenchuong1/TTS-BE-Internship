import { IsEnum, IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';
import { TaskStatus } from 'src/common/enums/taskstatus.enum';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class CreateTaskDto {
  @ApiProperty({
    example: 'Buy milk',
    description: 'Title of the Task item',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Buy 2 cartons of milk',
    description: 'Details of the task',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ enum: TaskStatus, required: false })
  @IsEnum(TaskStatus)
  @IsOptional()
  status: TaskStatus;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  assigneeId: number;
}
