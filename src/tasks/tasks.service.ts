import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { TaskStatus } from '../common/enums/taskstatus.enum';
import { Priority } from '../common/enums/priority.enum';
import { FindTaskDto } from './dto/find-task.dto';
import { CreateTaskHistoryDto } from '../task-histories/dto/create-task-history.dto';
import { TaskHistoriesService } from '../task-histories/task-histories.service';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly taskHistoriesService: TaskHistoriesService,
  ) {}

  async findAll(): Promise<Task[]> {
    return await this.tasksRepository.find({ relations: ['user_', 'parent_'] });
  }

  async findOne(id: string): Promise<Task | null> {
    return await this.tasksRepository.findOne({
      where: { id: id },
      relations: ['user_', 'parent_'],
    });
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description, status, priority, due_date, user_id, parent_id } = createTaskDto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = status ?? TaskStatus.PENDING;
    task.priority = priority ?? Priority.MEDIUM;
    task.due_date = due_date;
    if (task.status === TaskStatus.COMPLETED) {
      task.completed_at = new Date(); // Tự động gán ngày hoàn thành
    } else {
      task.completed_at = undefined;
    }

    if (user_id) {
      const assignee = await this.userRepository.findOne({
        where: { id: user_id }, // UUID dạng string
      });

      if (!assignee) {
        throw new NotFoundException(`User with ID ${user_id} not found`);
      }

      task.user_ = assignee;
    }
    if (parent_id) {
      const parentTask = await this.tasksRepository.findOne({
        where: { id: parent_id },
      });

      if (!parentTask) {
        throw new NotFoundException(`Parent Task with ID ${parent_id} not found`);
      }

      task.parent_ = parentTask; // Gán entity Task chứ không phải I
    }

    return this.tasksRepository.save(task);
  }

  async update(id: string, updateDTO: UpdateTaskDto): Promise<Task | null> {
    const { title, description, status, priority, due_date, user_, parent_ } = updateDTO;
    const task = await this.tasksRepository.findOne({
      where: { id },
      relations: ['user_', 'parent_'],
    });

    if (!task) throw new NotFoundException('Task not found');

    if (user_) {
      const user = await this.userRepository.findOne({ where: { id: user_ } });
      if (!user) throw new NotFoundException(`User with ID ${user_} not found`);
      task.user_ = user;
    }

    if (parent_) {
      const parent = await this.tasksRepository.findOne({ where: { id: parent_ } });
      if (!parent) throw new NotFoundException(`Parent Task with ID ${parent_} not found`);
      task.parent_ = parent;
    }

    task.title = title;
    task.description = description;
    task.due_date = due_date;
    if (status === TaskStatus.COMPLETED) {
      task.completed_at = new Date();
    }

    if (status !== task.status) {
      const history = new CreateTaskHistoryDto();
      history.task_id = id;
      history.title = task.title;
      history.user_id = task.user_?.id;
      history.user_name = task.user_?.username ?? 'unknown';
      history.field_changed = 'status';
      history.old_value = task.status;
      history.new_value = status as string;
      task.status = status!;
      await this.taskHistoriesService.create(history);
    }

    if (priority !== task.priority) {
      const history = new CreateTaskHistoryDto();
      history.task_id = task.id;
      history.title = task.title;
      history.user_id = task.user_?.id;
      history.user_name = task.user_?.username ?? 'unknown';
      history.field_changed = 'priority';
      history.old_value = task.priority;
      history.new_value = priority as string;
      task.priority = priority!;
      console.log('History being saved:', history);
      await this.taskHistoriesService.create(history);
    }

    await this.tasksRepository.update(id, task);
    return await this.tasksRepository.findOne({ where: { id: id } });
  }

  async delete(id: string): Promise<void> {
    await this.tasksRepository.delete(id);
  }
  // Tìm kiếm hoặc filter
  async searching(find_task: FindTaskDto) {
    const { title, status, priority, due_date } = find_task;
    const queryBuilder = this.tasksRepository.createQueryBuilder('task');

    if (title && title.trim() !== '') {
      queryBuilder.andWhere('task.title ILIKE :title', { title: `%${title}%` });
    }
    if (status) {
      queryBuilder.andWhere('task.status = :status', { status });
    }
    if (priority) {
      queryBuilder.andWhere('task.priority = :priority', { priority });
    }
    if (due_date) {
      queryBuilder.andWhere('task.due_date =:due_date', { due_date });
    }
    return await queryBuilder.leftJoinAndSelect('task.user_id', 'user_id').getMany();
  }
}
