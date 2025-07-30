import { Task } from '../../tasks/entities/task.entity';
import { Type_Link } from '../enum/task-links.enum';
import { PrimaryGeneratedColumn, ManyToOne, Column, Entity, CreateDateColumn } from 'typeorm';

@Entity('task_links')
export class TaskLink {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Task, { onDelete: 'CASCADE', eager: true })
  source_task_: Task;

  @ManyToOne(() => Task, { onDelete: 'CASCADE', eager: true })
  target_task_: Task;

  @Column({ type: 'enum', enum: Type_Link, default: Type_Link.BLOCKED })
  type: Type_Link;

  @CreateDateColumn()
  updated_at: Date;
}
