import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { Type_Link } from '../enum/task-links.enum';

export class UpdateTaskLinkDto {
  @ApiPropertyOptional({
    enum: Type_Link,
    example: Type_Link.BLOCKED,
    description: 'Type_Link level of the task-link',
  })
  @IsEnum(Type_Link)
  @IsOptional()
  type?: Type_Link;
}
