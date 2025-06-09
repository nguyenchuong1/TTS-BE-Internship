import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
    {
      userId: 3,
      username: 'admin',
      password: 'admin',
    },
  ];
  

  async create(userData: Partial<User>): Promise<User> {
    const user = {
      id: this.users.length + 1,
      ...userData,
    } as User;
    this.users.push(user);
    return user;
  }
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}