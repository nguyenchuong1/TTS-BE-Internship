import { Module } from '@nestjs/common';
import { SubtasksService } from './subtasks.service';
import { SubtasksController } from './subtasks.controller';
import { SubTask } from './entities/subtask.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubTask, User, Task])],
  controllers: [SubtasksController],
  providers: [SubtasksService],
})
export class SubtasksModule {}
