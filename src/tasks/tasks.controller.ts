import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from 'src/auths/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { TaskStatus } from '../common/enums/taskstatus.enum';
import { Public } from 'src/auths/decorator/auth.decorator';

@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth('access_token')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 200, description: 'Create', type: [Task] })
  @ApiBody({ type: CreateTaskDto })
  create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @Roles(Role.Admin, Role.User)
  @ApiOperation({ summary: 'Show all task' })
  @ApiResponse({ status: 200, description: 'Show all task in tasks', type: [CreateTaskDto] })
  async findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get('search')
  @Public()
  @ApiOperation({ summary: 'Search tasks by filters' })
  @ApiResponse({ status: 200, description: 'Filtered task list', type: [Task] })
  searchTasks(
    @Query('status') status: TaskStatus,
    @Query('assigneeId', ParseIntPipe) assigneeId: number,
    @Query('title') title: string,
  ): Promise<Task[]> {
    return this.tasksService.search({ status, assigneeId, title });
  }

  @Get(':id')
  @Roles(Role.Admin, Role.User)
  @ApiOperation({ summary: 'find task' })
  @ApiResponse({ status: 200, description: 'task found' })
  async findOne(@Param('id') id: number): Promise<Task> {
    const todo = await this.tasksService.findOne(id);
    if (!todo) {
      throw new NotFoundException('Todo not found in the list!');
    } else {
      return todo;
    }
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.User)
  @ApiOperation({ summary: 'Update task' })
  @ApiBody({ type: UpdateTaskDto })
  @ApiResponse({ status: 200, description: 'Tasks has been updated' })
  async update(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task | null> {
    const task = await this.tasksService.update(id, updateTaskDto);
    if (!task) {
      throw new NotFoundException(`task with id ${id} not found!`);
    } else {
      return task;
    }
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Delete task' })
  @ApiResponse({ status: 200, description: 'Task deleted!' })
  async delete(@Param('id') id: number): Promise<void> {
    const user = await this.tasksService.findOne(id);
    if (!user) {
      throw new NotFoundException('Not found task in database!');
    } else {
      return this.tasksService.delete(id);
    }
  }
}
