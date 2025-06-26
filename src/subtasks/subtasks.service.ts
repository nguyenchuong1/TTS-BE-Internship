import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubtaskDto } from './dto/create-subtask.dto';
import { UpdateSubtaskDto } from './dto/update-subtask.dto';
import { SubTask } from './entities/subtask.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../tasks/entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import { FindSubtaskDto } from './dto/find-subtasks.dto';
@Injectable()
export class SubtasksService {
  constructor(
    @InjectRepository(SubTask)
    private readonly subtaskRepository: Repository<SubTask>,
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createSubtaskDto: CreateSubtaskDto): Promise<SubTask> {
    const { title, description, status, taskId, assigneeId } = createSubtaskDto;
    const task = await this.tasksRepository.findOne({ where: { id: taskId } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }
    const assignee = await this.userRepository.findOne({ where: { id: assigneeId } });
    if (!assignee) {
      throw new NotFoundException(`Task with ID ${assigneeId} not found`);
    }
    const subtask = this.subtaskRepository.create({
      title,
      description,
      status,
      task,
      assignee,
    });
    return await this.subtaskRepository.save(subtask);
  }

  async findAll(): Promise<SubTask[]> {
    return await this.subtaskRepository.find();
  }

  async findOne(id_subtask: number): Promise<SubTask | null> {
    return await this.subtaskRepository.findOne({ where: { id: id_subtask } });
  }

  async update(id: number, updatesubtask: UpdateSubtaskDto): Promise<SubTask | null> {
    await this.subtaskRepository.update(id, updatesubtask);
    return this.subtaskRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.subtaskRepository.delete(id);
  }

  async searching(dto: FindSubtaskDto) {
    const { title, status, taskId, assigneeId, search } = dto;
    const queryBuilder = this.subtaskRepository.createQueryBuilder('subtask');

    if (title && title.trim() !== '') {
      queryBuilder.andWhere('subtask.title ILIKE :title', { title: `%${title}%` });
    }

    if (status) {
      queryBuilder.andWhere('subtask.status = :status', { status });
    }

    if (taskId) {
      queryBuilder.andWhere('subtask.taskId = :taskId', { taskId });
    }

    if (assigneeId) {
      queryBuilder.andWhere('subtask.assigneeId = :assigneeId', { assigneeId });
    }

    if (search && search.trim() !== '') {
      queryBuilder.andWhere('(subtask.title ILIKE :search OR subtask.description ILIKE :search)', {
        search: `%${search}%`,
      });
    }

    return await queryBuilder
      .leftJoinAndSelect('subtask.task', 'task')
      .leftJoinAndSelect('subtask.assignee', 'assignee')
      .getMany();
  }
}
