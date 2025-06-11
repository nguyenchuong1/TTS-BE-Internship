import { Injectable,InternalServerErrorException } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
// This should be a real class/interface representing a user entity

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) 
    private readonly usersRepository:Repository<User>
  ){}
  getHello(): string {
    return 'Mấy con mèo chào mọi người !';
  }
  async create(createUserDto:CreateUserDto):Promise<User> {
    try{
      const user = this.usersRepository.create(createUserDto);
      return await this.usersRepository.save(user);
    }catch(error){
      console.error('Lỗi khi tạo cat:', error);
          throw new InternalServerErrorException('Lỗi tạo cat');
    }
  }
  async findOne(username:string ): Promise<User|null> {
      return  await this.usersRepository.findOne({ where:{ username} });
    }
}