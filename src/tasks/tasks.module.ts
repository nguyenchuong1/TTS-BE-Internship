import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { TaskLink } from '../task-links/entities/task-link.entity';
import { TaskHistoriesModule } from '../task-histories/task-histories.module';
import { TaskHistory } from 'src/task-histories/entities/task-history.entity';
@Module({
  imports: [TaskHistoriesModule, TypeOrmModule.forFeature([Task, User, TaskLink, TaskHistory])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
