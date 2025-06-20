import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
// This should be a real class/interface representing a user entity

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  getHello(): string {
    return 'Mấy con mèo chào mọi người !';
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const user = this.usersRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });
      return await this.usersRepository.save(user);
    } catch (error) {
      console.error('Lỗi khi tạo user:', error);
      throw new InternalServerErrorException('Lỗi tạo user');
    }
  }

  async findOne(id: string | number): Promise<User | null> {
    if (typeof id === 'number') {
      return await this.usersRepository.findOne({ where: { id: id } });
    } else {
      return await this.usersRepository.findOne({ where: { username: id } });
    }
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async update(id: number, updateDTO: UpdateUserDto): Promise<User | null> {
    if (updateDTO.password) {
      updateDTO.password = await bcrypt.hash(updateDTO.password, 10);
    }

    await this.usersRepository.update(id, updateDTO);
    return this.usersRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
