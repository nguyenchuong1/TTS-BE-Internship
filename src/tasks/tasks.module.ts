import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubTask } from '../subtasks/entities/subtask.entity';
import { User } from 'src/users/entities/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Task, SubTask, User])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
