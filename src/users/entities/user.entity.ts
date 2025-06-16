import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../roles/role.enum';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The ID of the user' })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ example: 'johndoe', description: 'Username of the user' })
  username: string;

  @Column()
  @ApiProperty({ example: 'securePassword123', description: 'Hashed password of the user' })
  password: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'John', description: 'First name of the user' })
  firstName: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  lastName: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  @ApiProperty({ example: Role.User, description: 'Role of the user' })
  role: Role;
}
