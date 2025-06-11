import { Injectable, Optional, Inject, NotFoundException ,InternalServerErrorException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm' 
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './common/entities/cat.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catsRepository: Repository<Cat>,
  ) {}
 

  getHello(): string {
    return 'Mấy con mèo chào mọi người !';
  }

  async findAll(): Promise< Cat[]> {
    return await this.catsRepository.find();
  }

  async findOne(id: number): Promise<Cat|null> {
    return  await this.catsRepository.findOne({ where:{ id} });
  }

  async create(createCatDto: CreateCatDto): Promise<Cat> {
  try {
    const cat = this.catsRepository.create(createCatDto);
    return await this.catsRepository.save(cat);
  } catch (error) {
    console.error('Lỗi khi tạo cat:', error);
    throw new InternalServerErrorException('Lỗi tạo cat');
  }
}

  async update(id: number, updateCatDto: UpdateCatDto): Promise<Cat | null> {
  await this.catsRepository.update(id, updateCatDto);
  return await this.catsRepository.findOne({ where: { id } });
 }

  async delete(id: number): Promise<void> {
     await this.catsRepository.delete(id);
  }
}
// export class HttpService<T> {
//   constructor(@Optional() @Inject('HTTP_OPTIONS') private httpClient: T) {}
// }
