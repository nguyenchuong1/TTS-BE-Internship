import { Module } from '@nestjs/common';
import { TaskCommentsService } from './task-comments.service';
import { TaskCommentsController } from './task-comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskComment } from './entities/task-comment.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User, TaskComment])],
  controllers: [TaskCommentsController],
  providers: [TaskCommentsService],
})
export class TaskCommentsModule {}
