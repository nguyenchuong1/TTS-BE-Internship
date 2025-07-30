import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';
import { User } from '../../users/entities/user.entity';

@Entity('task-histories')
export class TaskHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Task, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  task_: Task;

  @Column()
  title: string;

  @ManyToOne(() => User, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  user_: User; // FK tới User

  @Column()
  user_name: string;

  @Column({ type: 'text' })
  field_changed: string;

  @Column({ type: 'text' })
  old_value: string;

  @Column({ type: 'text' })
  new_value: string;

  @CreateDateColumn()
  changed_at: Date;
}
