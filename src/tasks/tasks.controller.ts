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
  // ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '../auths/auth.guard';
import { RolesGuard } from '../roles/roles.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/role.enum';
import { TaskStatus } from '../common/enums/taskstatus.enum';
import { FindTaskDto } from './dto/find-task.dto';
import { Priority } from '../common/enums/priority.enum';

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
  @Roles(Role.Admin, Role.User)
  @ApiOperation({ summary: 'Search Task' })
  @ApiResponse({ status: 200, description: 'Search Task' })
  @ApiQuery({ name: 'title', required: false })
  @ApiQuery({ name: 'status', enum: TaskStatus, required: false })
  @ApiQuery({ name: 'priority', enum: Priority, required: false })
  @ApiQuery({ name: 'due_date', required: false, type: Number })
  // @ApiQuery({ name: 'assigneeId', required: false, type: Number })
  // @ApiQuery({ name: 'search', required: false })
  searching(@Query() query: FindTaskDto) {
    return this.tasksService.searching(query);
  }

  @Get(':id')
  @Roles(Role.Admin, Role.User)
  @ApiOperation({ summary: 'find task' })
  @ApiResponse({ status: 200, description: 'task found' })
  async findOne(@Param('id') id: string): Promise<Task> {
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
    @Param('id') id: string,
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
  async delete(@Param('id') id: string): Promise<void> {
    const task = await this.tasksService.findOne(id);
    if (!task) {
      throw new NotFoundException('Not found task in database!');
    } else {
      return this.tasksService.delete(id);
    }
  }
}
