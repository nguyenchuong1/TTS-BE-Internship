import { Injectable, Optional, Inject, NotFoundException } from '@nestjs/common';
// import {Cat} from './interfaces/cat.interface';
import { Cat } from './common/entities/cat.entity';
@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [
    {
      id: 0,
      name: 'Tom',
      age: 3,
      breed: 'British Shorthair',
    },
    {
      id: 1,
      name: 'Jerry',
      age: 2,
      breed: 'Siamese',
    },
    {
      id: 2,
      name: 'Milo',
      age: 1,
      breed: 'Persian',
    },
    {
      id: 3,
      name: 'Luna',
      age: 4,
      breed: 'Bengal',
    },
    {
      id: 4,
      name: 'Leo',
      age: 5,
      breed: 'Maine Coon',
    },
  ];

  getHello(): string {
    return 'Mấy con mèo chào mọi người !';
  }

  create(cat: Cat) {
    this.cats.push(cat);
    return cat;
  }

  findOne(id: number): Cat | undefined {
    return this.cats.find((cat) => cat.id === id);
  }

  findAll(): Cat[] {
    return this.cats;
  }

  removeCat(id: number): Cat[] {
    const index = this.cats.findIndex((cat) => cat.id === id);

    if (index === -1) {
      throw new NotFoundException(`Cat with id ${id} not found`);
    }
    console.log(this.cats);
    console.log('ID cần xoá:', id);
    this.cats.splice(index, 1);
    return this.cats;
  }
}
// export class HttpService<T> {
//   constructor(@Optional() @Inject('HTTP_OPTIONS') private httpClient: T) {}
// }
