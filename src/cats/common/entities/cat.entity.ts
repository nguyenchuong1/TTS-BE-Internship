import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'The ID of the cat',
  })
  id: number;
  @Column()
  @ApiProperty({
    example: 'Mèo Cỏ',
    description: 'The name of the cat',
  })
  name: string;
  @Column()
  @ApiProperty({
    example: 55,
    description: 'The age of the Cat',
  })
  age: number;
  @Column()
  @ApiProperty({
    example: 'Maine Coon',
    description: 'The breed of the Cat',
  })
  breed: string;
}
