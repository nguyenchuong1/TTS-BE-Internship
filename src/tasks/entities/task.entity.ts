import { IsOptional, IsString } from 'class-validator';
import { Priority } from '../../common/enums/priority.enum';
import { TaskStatus } from '../../common/enums/taskstatus.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { TaskLink } from '../../task-links/entities/task-link.entity';
import { TaskHistory } from '../../task-histories/entities/task-history.entity';
import { TaskComment } from '../../task-comments/entities/task-comment.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  id: string;

  @ManyToOne(() => User, (user) => user.tasks, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  user_: User; // FK tới User

  @Column()
  @IsString()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.PENDING })
  status: TaskStatus;

  @Column({ type: 'enum', enum: Priority, default: Priority.MEDIUM })
  priority: Priority;
  @IsOptional()
  @Column({ type: 'timestamp', nullable: true })
  due_date?: Date;

  @IsOptional()
  @Column({ type: 'timestamp', nullable: true })
  completed_at?: Date;

  @ManyToOne(() => Task, { nullable: true, onDelete: 'CASCADE' })
  parent_: Task;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => TaskLink, (task_source) => task_source.source_task_)
  source_task: TaskLink[];

  @OneToMany(() => TaskLink, (target_task) => target_task.target_task_)
  target_task: TaskLink[];

  @OneToMany(() => TaskHistory, (task_history) => task_history.task_)
  task_history: TaskHistory[];

  @OneToMany(() => TaskComment, (task_comments) => task_comments.task_)
  task_comments: TaskComment[];
}
