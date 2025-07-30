import { Test, TestingModule } from '@nestjs/testing';
import { TaskHistoriesService } from './task-histories.service';

describe('TaskHistoriesService', () => {
  let service: TaskHistoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskHistoriesService],
    }).compile();

    service = module.get<TaskHistoriesService>(TaskHistoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
