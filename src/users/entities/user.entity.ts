import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The ID of the user' })
  id: number;

  @Column({ unique: true }) // Đảm bảo không bị trùng
  @ApiProperty({ example: 'johndoe', description: 'Username of the user' })
  username: string;

  @Column()
  @ApiProperty({ example: 'securePassword123', description: 'Hashed password of the user' })
  password: string;

  @Column({ nullable: true }) // Cho phép null nếu không bắt buộc
  @ApiProperty({ example: 'John', description: 'First name of the user' })
  first_name: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  last_name: string;
}
