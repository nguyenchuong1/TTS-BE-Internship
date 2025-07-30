import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';
// import { Task } from '../../tasks/entities/task.entity';
import { Type } from 'class-transformer';

export class CreateTaskHistoryDto {
  @ApiPropertyOptional({
    example: 'a056a9c1-0b89-4024-865c-a6a9d6f588b6',
    description: 'mã id của task đó',
    nullable: false,
  })
  @IsNotEmpty()
  @IsUUID()
  task_id: string;

  @ApiProperty({
    example: 'Buy milk',
    description: 'Title of the task',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    example: 5,
    description: 'ID of the user assigned to this task',
  })
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  user_id: number;

  @ApiProperty({
    example: 'Chuong',
    description: 'Detailed description of the task',
  })
  @IsString()
  @IsNotEmpty()
  user_name: string;

  @ApiProperty({
    example: 'Status/ Prority in Task',
    description: 'Nếu status thay đổi thì field_change= status , vậy thôi =)))',
  })
  @IsString()
  @IsNotEmpty()
  field_changed: string;

  @ApiProperty({
    example: 'pending',
    description: 'giá trị hiện tại của trường hiện tại+',
  })
  @IsString()
  @IsNotEmpty()
  new_value: string;

  @ApiProperty({
    example: 'in_process',
    description: 'giá trị hiện tại của trường hiện tại+',
  })
  @IsString()
  @IsNotEmpty()
  old_value: string;
}
