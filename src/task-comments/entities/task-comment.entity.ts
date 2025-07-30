import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';
import { User } from '../../users/entities/user.entity';

@Entity('task-comments')
export class TaskComment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Task, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  task_: Task;

  @ManyToOne(() => User, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  user_: User; // FK tới User

  @Column()
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
