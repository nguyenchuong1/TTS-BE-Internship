import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
  Patch,
} from '@nestjs/common';
import { TaskLinksService } from './task-links.service';
import { CreateTaskLinkDto } from './dto/create-task-link.dto';
import { UpdateTaskLinkDto } from './dto/update-task-link.dto';
import { AuthGuard } from '../auths/auth.guard';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TaskLink } from './entities/task-link.entity';
import { Role } from '../roles/role.enum';

@UseGuards(AuthGuard, RolesGuard)
@Controller('tasklinks')
export class TaskLinksController {
  constructor(private readonly taskLinksService: TaskLinksService) {}

  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Create a new task link' })
  @ApiResponse({ status: 200, description: 'Create', type: [TaskLink] })
  @ApiBody({ type: CreateTaskLinkDto })
  create(@Body() createTaskLinkDto: CreateTaskLinkDto): Promise<TaskLink> {
    return this.taskLinksService.create(createTaskLinkDto);
  }

  @Get()
  @Roles(Role.Admin, Role.User)
  @ApiOperation({ summary: 'Show all task link' })
  @ApiResponse({ status: 200, description: 'Show all task link ', type: [CreateTaskLinkDto] })
  findAll(): Promise<TaskLink[]> {
    return this.taskLinksService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin, Role.User)
  @ApiOperation({ summary: 'find task link' })
  @ApiResponse({ status: 200, description: 'task link found' })
  async findOne(@Param('id') id: number): Promise<TaskLink> {
    const task = await this.taskLinksService.findOne(id);
    if (!task) {
      throw new NotFoundException('Task link not found in the list!');
    } else {
      return task;
    }
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.User)
  @ApiOperation({ summary: 'update task link to' })
  @ApiResponse({ status: 200, description: 'task link updated' })
  update(
    @Param('id') id: number,
    @Body() updateTaskLinkDto: UpdateTaskLinkDto,
  ): Promise<TaskLink | null> {
    return this.taskLinksService.update(id, updateTaskLinkDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Delete task link' })
  @ApiResponse({ status: 200, description: 'Task link deleted!' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    const task_link = await this.taskLinksService.findOne(id);
    if (!task_link) {
      throw new NotFoundException('Not found task link in database!');
    } else {
      return this.taskLinksService.delete(id);
    }
  }

  @Get('/source/:taskId')
  async findBySourceTask(@Param('taskId') taskId: string): Promise<TaskLink[]> {
    return this.taskLinksService.findBySourceTask(taskId);
  }
}
