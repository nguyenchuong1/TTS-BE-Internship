// import { Test, TestingModule } from '@nestjs/testing';
// import { TasksService } from './tasks.service';
// import { User } from 'src/users/entities/user.entity';

// describe('TasksService', () => {
//   let service: TasksService;
//   let usersservice: User;
//   const mockTasksRepository = {
//     find: jest.fn(),
//     findOne: jest.fn(),
//     create: jest.fn(),
//     save: jest.fn(),
//     update: jest.fn(),
//     delete: jest.fn(),
//   };
//   const mockUserRepository = {

//   }
//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [TasksService,{
//         provide: ge,
//         useClass: mockTasksRepository
//       }],
//     }).compile();

//     service = module.get<TasksService>(TasksService);
//     usersservice = module.get<User>(User);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });
