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
} from '@nestjs/common';
import { TaskCommentsService } from './task-comments.service';
import { CreateTaskCommentDto } from './dto/create-task-comment.dto';
import { UpdateTaskCommentDto } from './dto/update-task-comment.dto';
import { TaskComment } from './entities/task-comment.entity';
import { AuthGuard } from '../auths/auth.guard';
import { RolesGuard } from '../roles/roles.guard';
import { Role } from '../roles/role.enum';
import { Roles } from '../roles/roles.decorator';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { FindTaskCommentDto } from './dto/find_task_comment';
@UseGuards(AuthGuard, RolesGuard)
@Controller('task-comments')
export class TaskCommentsController {
  constructor(private readonly taskCommentsService: TaskCommentsService) {}

  @Post()
  @Roles(Role.Admin, Role.User)
  @ApiOperation({ summary: 'Create a new task commments' })
  @ApiResponse({ status: 200, description: 'Create', type: [TaskComment] })
  @ApiBody({ type: CreateTaskCommentDto })
  create(@Body() createTaskCommentDto: CreateTaskCommentDto): Promise<TaskComment | null> {
    return this.taskCommentsService.create(createTaskCommentDto);
  }

  @Get()
  @Roles(Role.Admin, Role.User)
  @ApiOperation({ summary: 'Show all comments task' })
  @ApiResponse({
    status: 200,
    description: 'Show all comments in this task',
    type: [CreateTaskCommentDto],
  })
  async findAll(): Promise<TaskComment[]> {
    return await this.taskCommentsService.findAll();
  }
  @Get('search')
  @Roles(Role.Admin, Role.User)
  @ApiOperation({ summary: 'Search Task' })
  @ApiResponse({ status: 200, description: 'Search Task' })
  @ApiQuery({ name: 'task_', required: false })
  async searching(@Query() query: FindTaskCommentDto) {
    return await this.taskCommentsService.searching(query);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.User)
  @ApiOperation({ summary: 'Update comment' })
  @ApiBody({ type: UpdateTaskCommentDto })
  @ApiResponse({ status: 200, description: 'Comment has been updated' })
  async update(
    @Param('id') id: number,
    @Body() updateTaskCommentDto: UpdateTaskCommentDto,
  ): Promise<TaskComment | null> {
    return await this.taskCommentsService.update(id, updateTaskCommentDto);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.User)
  @ApiOperation({ summary: 'Delete commments task' })
  @ApiResponse({ status: 200, description: 'Comments task deleted!' })
  async delete(@Param('id') id: number): Promise<void> {
    const tc = await this.taskCommentsService.findOne(id);
    if (!tc) {
      throw new NotFoundException('Not found comments in task!');
    } else {
      return this.taskCommentsService.delete(id);
    }
  }
}
