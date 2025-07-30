// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
//   NotFoundException,
//   UseGuards,
//   Query,
// } from '@nestjs/common';
// import { SubtasksService } from './subtasks.service';
// import { CreateSubtaskDto } from './dto/create-subtask.dto';
// import { UpdateSubtaskDto } from './dto/update-subtask.dto';
// import { Roles } from 'src/roles/roles.decorator';
// import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
// import { Role } from 'src/roles/role.enum';
// import { SubTask } from './entities/subtask.entity';
// import { AuthGuard } from 'src/auths/auth.guard';
// import { RolesGuard } from 'src/roles/roles.guard';
// import { FindSubtaskDto } from './dto/find-subtasks.dto';
// import { TaskStatus } from 'src/common/enums/taskstatus.enum';

// @UseGuards(AuthGuard, RolesGuard)
// @ApiBearerAuth('access_token')
// @Controller('subtasks')
// export class SubtasksController {
//   constructor(private readonly subtasksService: SubtasksService) {}
//   @Post()
//   @Roles(Role.Admin)
//   @ApiOperation({ summary: 'Create a new sub task' })
//   @ApiResponse({ status: 201, description: 'Created subtask', type: [SubTask] })
//   @ApiBody({ type: CreateSubtaskDto })
//   async create(@Body() dto: CreateSubtaskDto): Promise<SubTask> {
//     const subtask = await this.subtasksService.create(dto);
//     if (!subtask) {
//       throw new NotFoundException('Cannot create subtask. Task or Assignee not found.');
//     }
//     return subtask;
//   }

//   @Get()
//   @Roles(Role.Admin, Role.User)
//   @ApiOperation({ summary: 'Show all subtask' })
//   @ApiResponse({ status: 200, description: 'Show all task in tasks' })
//   async findAll(): Promise<SubTask[]> {
//     return await this.subtasksService.findAll();
//   }

//   @Get('search')
//   @Roles(Role.Admin, Role.User)
//   @ApiOperation({ summary: 'Search Sub Task' })
//   @ApiResponse({ status: 200, description: 'Search Sub Task' })
//   @ApiQuery({ name: 'title', required: false })
//   @ApiQuery({ name: 'status', enum: TaskStatus, required: false })
//   @ApiQuery({ name: 'taskId', required: false, type: Number })
//   @ApiQuery({ name: 'assigneeId', required: false, type: Number })
//   @ApiQuery({ name: 'search', required: false })
//   searching(@Query() query: FindSubtaskDto) {
//     return this.subtasksService.searching(query);
//   }

//   @Get(':id')
//   @Roles(Role.Admin, Role.User)
//   @ApiOperation({ summary: 'Display one subtask' })
//   @ApiResponse({ status: 200, description: 'Display all task in tasks' })
//   async findOne(@Param('id') id: number): Promise<SubTask> {
//     const display_subtask = await this.subtasksService.findOne(+id);
//     if (!display_subtask) {
//       throw new NotFoundException('sub task not found in the list!');
//     } else {
//       return display_subtask;
//     }
//   }

//   @Patch(':id')
//   @Roles(Role.Admin, Role.User)
//   @ApiOperation({ summary: 'Update sub task' })
//   @ApiBody({ type: UpdateSubtaskDto })
//   @ApiResponse({ status: 200, description: 'Sub tasks has been updated' })
//   update(@Param('id') id: number, @Body() updateSubtaskDto: UpdateSubtaskDto) {
//     return this.subtasksService.update(id, updateSubtaskDto);
//   }

//   @Delete(':id')
//   @Roles(Role.Admin)
//   @ApiOperation({ summary: 'Delete sub task' })
//   @ApiResponse({ status: 200, description: 'Sub task deleted!' })
//   remove(@Param('id') id: number) {
//     return this.subtasksService.delete(id);
//   }
// }
