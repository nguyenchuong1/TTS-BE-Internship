import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../roles/role.enum';
import { Task } from '../../tasks/entities/task.entity';
import { TaskHistory } from '../../task-histories/entities/task-history.entity';
import { TaskComment } from '../../task-comments/entities/task-comment.entity';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The ID of the user' })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ example: 'johndoe', description: 'Username of the user' })
  username: string;

  @Column()
  @ApiProperty({ example: 'securePassword123', description: 'Hashed password of the user' })
  password: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'John', description: 'First name of the user' })
  firstName: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  lastName: string;

  @Column({ nullable: true, default: null })
  refresh_token: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  @ApiProperty({ example: 'user/admin', description: 'Role of the user' })
  role: Role;

  @OneToMany(() => Task, (task) => task.user_)
  tasks: Task[];

  @OneToMany(() => TaskHistory, (task_history) => task_history.user_)
  task_history: TaskHistory[];

  @OneToMany(() => TaskComment, (task_momments) => task_momments.user_)
  task_comments: TaskComment[];
}
