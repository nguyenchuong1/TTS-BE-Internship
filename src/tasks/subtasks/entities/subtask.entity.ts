import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import { TaskStatus } from 'src/tasks/enums/taskstatus.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class SubTask {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number;

  @Column('text')
  description: string;

  @Column()
  @ApiProperty({ example: 'Fix bug in login module' })
  title: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  @ApiProperty({ example: TaskStatus.IN_PROGRESS, enum: TaskStatus })
  status: TaskStatus;

  @ManyToOne(() => Task, (task) => task.subTasks, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @ApiProperty({ type: () => Task })
  task: Task;

  @ManyToOne(() => User, (user) => user.subtasks, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @ApiProperty({ type: () => User, nullable: true })
  assignee: User;
}
