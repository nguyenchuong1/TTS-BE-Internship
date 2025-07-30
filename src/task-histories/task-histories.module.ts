import { Module } from '@nestjs/common';
import { TaskHistoriesService } from './task-histories.service';
import { TaskHistoriesController } from './task-histories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskHistory } from './entities/task-history.entity';
import { Task } from '../tasks/entities/task.entity';
import { User } from '../users/entities/user.entity';
// import { User } from '../users/entities/user.entity';
// import { Task } from '../tasks/entities/task.entity';
// import { TasksModule } from '../tasks/tasks.module';
@Module({
  imports: [TypeOrmModule.forFeature([TaskHistory, Task, User])],
  controllers: [TaskHistoriesController],
  providers: [TaskHistoriesService],
  exports: [TaskHistoriesService],
})
export class TaskHistoriesModule {}
