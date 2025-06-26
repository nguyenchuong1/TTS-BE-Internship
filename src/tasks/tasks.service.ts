import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { TaskStatus } from '../common/enums/taskstatus.enum';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Task[]> {
    return await this.tasksRepository.find({
      relations: ['subTasks'],
    });
  }

  async findOne(id_task: number): Promise<Task | null> {
    return await this.tasksRepository.findOne({ where: { id: id_task } });
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description, status, assigneeId } = createTaskDto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = status;

    if (assigneeId) {
      const assignee = await this.userRepository.findOne({
        where: { id: assigneeId },
      });

      if (!assignee) {
        throw new NotFoundException(`User with ID ${assigneeId} not found`);
      }

      task.assignee = assignee;
    }

    return this.tasksRepository.save(task);
  }

  async update(id: number, updateDTO: UpdateTaskDto): Promise<Task | null> {
    await this.tasksRepository.update(id, updateDTO);
    return this.tasksRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }

  async search(filters: {
    status?: TaskStatus;
    assigneeId?: number;
    title?: string;
  }): Promise<Task[]> {
    const query = this.tasksRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.assignee', 'assignee')
      .leftJoinAndSelect('task.subTasks', 'subTasks');
    if (filters.status) {
      query.andWhere('task.status = :status', { status: filters.status });
    }
    if (filters.assigneeId) {
      query.andWhere('task.assigneeId = :assigneeId', { assigneeId: filters.assigneeId });
    }
    if (filters.title) {
      query.andWhere('task.title ILIKE :title', { title: `%${filters.title}%` });
    }
    return await query.getMany();
  }
}
