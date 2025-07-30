import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTaskHistoryDto } from './dto/create-task-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskHistory } from './entities/task-history.entity';
import { User } from '../users/entities/user.entity';
import { Task } from '../tasks/entities/task.entity';

@Injectable()
export class TaskHistoriesService {
  constructor(
    @InjectRepository(TaskHistory)
    private readonly taskHistoryRepository: Repository<TaskHistory>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(dto: CreateTaskHistoryDto): Promise<TaskHistory | null> {
    try {
      const history_task = new TaskHistory();
      history_task.title = dto.title;
      history_task.user_name = dto.user_name;
      history_task.field_changed = dto.field_changed;
      history_task.old_value = dto.old_value;
      history_task.new_value = dto.new_value;

      if (dto.task_id) {
        const task = await this.taskRepository.findOne({
          where: { id: dto.task_id }, // UUID dạng string
        });

        if (!task) {
          throw new NotFoundException(`User with ID ${dto.user_id} not found`);
        }

        history_task.task_ = task;
      }
      if (dto.user_id) {
        const assignee = await this.userRepository.findOne({
          where: { id: dto.user_id }, // UUID dạng string
        });

        if (!assignee) {
          throw new NotFoundException(`User with ID ${dto.user_id} not found`);
        }

        history_task.user_ = assignee;
      }
      return await this.taskHistoryRepository.save(history_task);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async findAll(): Promise<TaskHistory[]> {
    return await this.taskHistoryRepository.find();
  }

  async findOne(id: string): Promise<TaskHistory | null> {
    return await this.taskHistoryRepository.findOne({ where: { task_: { id } } });
  }
}
