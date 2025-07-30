import { Test, TestingModule } from '@nestjs/testing';
import { TaskHistoriesController } from './task-histories.controller';
import { TaskHistoriesService } from './task-histories.service';

describe('TaskHistoriesController', () => {
  let controller: TaskHistoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskHistoriesController],
      providers: [TaskHistoriesService],
    }).compile();

    controller = module.get<TaskHistoriesController>(TaskHistoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
