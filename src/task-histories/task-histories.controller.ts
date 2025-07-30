import { Controller, Get, Body, Param, UseGuards, NotFoundException } from '@nestjs/common';
import { TaskHistoriesService } from './task-histories.service';
import { TaskHistory } from './entities/task-history.entity';
import { AuthGuard } from '../auths/auth.guard';
import { RolesGuard } from '../roles/roles.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';

@UseGuards(AuthGuard, RolesGuard)
@Controller('task-histories')
export class TaskHistoriesController {
  constructor(private readonly taskHistoriesService: TaskHistoriesService) {}

  @Get()
  @Roles(Role.Admin, Role.User)
  @ApiOperation({ summary: 'Show all history tasks' })
  @ApiResponse({ status: 200, description: 'Show all history of task', type: [CreateTaskDto] })
  async findAll(): Promise<TaskHistory[]> {
    return await this.taskHistoriesService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin, Role.User)
  @ApiOperation({ summary: 'find task' })
  @ApiResponse({ status: 200, description: 'task history found' })
  async findOne(@Param('id') id: string): Promise<TaskHistory> {
    const findtaskhistory = await this.taskHistoriesService.findOne(id);
    if (!findtaskhistory) {
      throw new NotFoundException('Task not found in the list!');
    } else {
      return findtaskhistory;
    }
  }
}
