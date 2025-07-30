import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskCommentDto } from './dto/create-task-comment.dto';
import { UpdateTaskCommentDto } from './dto/update-task-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../tasks/entities/task.entity';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { TaskComment } from './entities/task-comment.entity';
import { FindTaskCommentDto } from './dto/find_task_comment';

@Injectable()
export class TaskCommentsService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(TaskComment)
    private readonly taskcommentsRepository: Repository<TaskComment>,
  ) {}
  async create(createTaskCommentDto: CreateTaskCommentDto): Promise<TaskComment> {
    const { user_id, task_id, content } = createTaskCommentDto;

    const task_comments = new TaskComment();
    task_comments.content = content;
    if (user_id) {
      const assignee = await this.userRepository.findOne({
        where: { id: user_id },
      });

      if (!assignee) {
        throw new NotFoundException(`User with ID ${user_id} not found`);
      }

      task_comments.user_ = assignee;
    }
    if (task_id) {
      const taskId = await this.tasksRepository.findOne({
        where: { id: task_id },
      });

      if (!taskId) {
        throw new NotFoundException(`Parent Task with ID ${task_id} not found`);
      }

      task_comments.task_ = taskId;
    }

    return this.taskcommentsRepository.save(task_comments);
  }

  async findAll(): Promise<TaskComment[]> {
    return await this.taskcommentsRepository.find();
  }

  async findOne(id: number): Promise<TaskComment | null> {
    return await this.taskcommentsRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateDto: UpdateTaskCommentDto): Promise<TaskComment | null> {
    const comment = await this.taskcommentsRepository.findOne({
      where: { id: id },
    });
    if (!comment) throw new NotFoundException('Comment not found');

    let isUpdated = false;

    if (updateDto.content && updateDto.content !== comment.content) {
      comment.content = updateDto.content;
      isUpdated = true;
    }

    if (isUpdated) {
      await this.taskcommentsRepository.save(comment);
    }
    return this.taskcommentsRepository.findOne({
      where: { id: id },
    });
  }

  async delete(id: number): Promise<void> {
    await this.taskcommentsRepository.delete(id);
  }

  async searching(find_task: FindTaskCommentDto) {
    const { task_ } = find_task;
    const queryBuilder = this.taskcommentsRepository.createQueryBuilder('taskComments');

    if (task_) {
      queryBuilder.andWhere('taskComments.task_ = :task_', { task_ });
    }

    return await queryBuilder
      .leftJoinAndSelect('taskComments.task_', 'task_')
      .leftJoinAndSelect('taskComments.user_', 'user_')
      .getMany();
  }
}
