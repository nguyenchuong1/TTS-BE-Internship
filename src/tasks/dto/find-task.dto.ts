import { TaskStatus } from '../../common/enums/taskstatus.enum';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
// import { Transform, Type } from 'class-transformer';
import { Priority } from '../../common/enums/priority.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindTaskDto {
  @ApiPropertyOptional({ description: 'Search in title' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ enum: TaskStatus })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiPropertyOptional({ description: 'Search in title' })
  @IsOptional()
  @IsString()
  priority?: Priority;

  @ApiPropertyOptional({ description: 'Due date to (ISO format)' })
  @IsOptional()
  @IsDateString()
  due_date?: Date;

  @ApiPropertyOptional({ description: 'Complete at ' })
  @IsOptional()
  @IsDateString()
  complete_at?: Date;

  @ApiPropertyOptional({ description: 'Search in title' })
  @IsOptional()
  @IsString()
  user_id?: number;
}
