import { Module } from '@nestjs/common';
import { TaskLinksService } from './task-links.service';
import { TaskLinksController } from './task-links.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskLink } from './entities/task-link.entity';
import { Task } from '../tasks/entities/task.entity';
@Module({
  imports: [TypeOrmModule.forFeature([TaskLink, Task])],
  controllers: [TaskLinksController],
  providers: [TaskLinksService],
  exports: [TaskLinksService],
})
export class TaskLinksModule {}
