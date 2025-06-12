import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Unique identifier of the Todo item' })
  id: number;

  @Column()
  @ApiProperty({ example: 'Buy milk', description: 'Title of the Todo item' })
  title: string;

  @Column({ nullable: true })
  @ApiProperty({
    example: '2 liters of whole milk',
    required: false,
    description: 'Detailed description (optional)',
  })
  description?: string;

  @Column({ default: false })
  @ApiProperty({ example: false, description: 'Whether the task is completed' })
  isCompleted: boolean;

  @CreateDateColumn()
  @ApiProperty({ example: '2025-06-11T12:34:56.789Z', description: 'Creation timestamp' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ example: '2025-06-11T13:00:00.000Z', description: 'Last update timestamp' })
  updatedAt: Date;
}
