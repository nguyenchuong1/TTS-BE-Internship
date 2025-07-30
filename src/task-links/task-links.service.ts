import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskLinkDto } from './dto/create-task-link.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../tasks/entities/task.entity';
import { TaskLink } from './entities/task-link.entity';
import { Repository } from 'typeorm';
import { Type_Link } from './enum/task-links.enum';
import { UpdateTaskLinkDto } from './dto/update-task-link.dto';

@Injectable()
export class TaskLinksService {
  constructor(
    @InjectRepository(TaskLink)
    private readonly taskLinkRepository: Repository<TaskLink>,

    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskLinkDto: CreateTaskLinkDto): Promise<TaskLink> {
    const { type, sourceTask_id, targetTask_id } = createTaskLinkDto;

    if (!sourceTask_id || !targetTask_id) {
      throw new BadRequestException('Both sourceTask_id and targetTask_id are required');
    }

    if (sourceTask_id === targetTask_id) {
      throw new BadRequestException('A task cannot be linked to itself');
    }

    // Check if link already exists in either direction
    const existingLink = await this.taskLinkRepository.findOne({
      where: [
        { source_task_: { id: sourceTask_id }, target_task_: { id: targetTask_id } },
        { source_task_: { id: targetTask_id }, target_task_: { id: sourceTask_id } },
      ],
    });

    if (existingLink) {
      throw new BadRequestException(
        `A link between task "${existingLink.source_task_.title}" and task "${existingLink.target_task_.title}" already exists`,
      );
    }

    const source = await this.taskRepository.findOne({ where: { id: sourceTask_id } });
    if (!source) throw new NotFoundException(`Task A with ID ${sourceTask_id} not found`);

    const target = await this.taskRepository.findOne({ where: { id: targetTask_id } });
    if (!target) throw new NotFoundException(`Task B with ID ${targetTask_id} not found`);

    const taskLink = new TaskLink();
    taskLink.type = type ?? Type_Link.BLOCKED;
    taskLink.source_task_ = source;
    taskLink.target_task_ = target;

    return this.taskLinkRepository.save(taskLink);
  }

  async findAll(): Promise<TaskLink[]> {
    return await this.taskLinkRepository.find();
  }

  async findOne(id: number): Promise<TaskLink | null> {
    return await this.taskLinkRepository.findOne({ where: { id: id } });
  }

  async findBySourceTask(taskId: string): Promise<TaskLink[]> {
    return await this.taskLinkRepository.find({
      where: { source_task_: { id: taskId } },
      relations: ['source_task_', 'target_task_'],
    });
  }

  async update(id: number, updateTaskLinkDto: UpdateTaskLinkDto): Promise<TaskLink> {
    const taskLink = await this.taskLinkRepository.findOne({
      where: { id },
      relations: ['source_task_', 'target_task_'], // nếu cần
    });

    if (!taskLink) {
      throw new NotFoundException(`TaskLink with ID ${id} not found`);
    }

    const { type } = updateTaskLinkDto;

    if (type) {
      taskLink.type = type;
    }

    return this.taskLinkRepository.save(taskLink);
  }

  async delete(id: number): Promise<void> {
    await this.taskLinkRepository.delete(id);
  }
}
