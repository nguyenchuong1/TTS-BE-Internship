import { Injectable ,Optional ,Inject,NotFoundException} from "@nestjs/common";
import {Cat} from './interfaces/cat.interface';

@Injectable()
export class CatsService{
  private readonly cats: Cat[] = [];
  getHello(): string {
    return 'Hello Chuong Nguyen!';
  }
  create(cat: Cat){
    this.cats.push(cat);
    return cat;
  }
  findOne(id: number): Cat | undefined {
  return this.cats.find(cat => cat.id  === id);
  }
  findALL():Cat[]{
    return this.cats
  }
  remove_a_cat(id: number):Cat[] {
    const index = this.cats.findIndex(cat => cat.id === id);

    if (index === -1) {
      throw new NotFoundException(`Cat with id ${id} not found`);
    }
    console.log(this.cats);
    console.log("ID cần xoá:", id);
    this.cats.splice(index, 1);
    return this.cats; 
  }

}
export class HttpService<T> {
  constructor(@Optional() @Inject('HTTP_OPTIONS') private httpClient: T) {}
}