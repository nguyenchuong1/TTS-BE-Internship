import { Test, TestingModule } from '@nestjs/testing';
import { TaskLinksController } from './task-links.controller';
import { TaskLinksService } from './task-links.service';

describe('TaskLinksController', () => {
  let controller: TaskLinksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskLinksController],
      providers: [TaskLinksService],
    }).compile();

    controller = module.get<TaskLinksController>(TaskLinksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
