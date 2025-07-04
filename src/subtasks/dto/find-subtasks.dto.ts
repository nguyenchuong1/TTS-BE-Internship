import { TaskStatus } from 'src/common/enums/taskstatus.enum';
import { IsOptional, IsString, IsEnum, IsNumber } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class FindSubtaskDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }: { value: string }): string | undefined =>
    value === '' ? undefined : value,
  )
  title?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  @Transform(({ value }: { value: string }): TaskStatus | undefined =>
    value === '' ? undefined : (value as TaskStatus),
  )
  status?: TaskStatus;

  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }: { value: string }): number | undefined =>
    value === '' ? undefined : Number(value),
  )
  @IsNumber()
  taskId?: number;

  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }: { value: string }): number | undefined =>
    value === '' ? undefined : Number(value),
  )
  @IsNumber()
  assigneeId?: number;

  @IsOptional()
  @IsString()
  @Transform(({ value }: { value: string }): string | undefined =>
    value === '' ? undefined : value,
  )
  search?: string;
}
