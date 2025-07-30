import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { Type_Link } from '../enum/task-links.enum';

export class CreateTaskLinkDto {
  @ApiPropertyOptional({
    example: 'a056a9c1-0b89-4024-865c-a6a9d6f588b6',
    description: 'Task A',
    nullable: false,
  })
  @IsOptional()
  @IsUUID()
  sourceTask_id?: string;

  @ApiPropertyOptional({
    example: 'a056a9c1-0b89-4024-865c-a6a9d6f588b6',
    description: 'Task B',
    nullable: false,
  })
  @IsOptional()
  @IsUUID()
  targetTask_id?: string;

  @ApiPropertyOptional({
    enum: Type_Link,
    example: Type_Link.BLOCKED,
    description: 'Type_Link level of the task-link',
  })
  @IsEnum(Type_Link)
  @IsOptional()
  type?: Type_Link;
}
