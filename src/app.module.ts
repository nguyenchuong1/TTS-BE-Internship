import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsModule } from './cats/cats.module'; 
import { AuthModule } from './auths/auth.module';
import { UsersModule } from './users/users.module';
import { Cat } from './cats/common/entities/cat.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'test',
      entities: [Cat],
      synchronize: true,
    }),

    CatsModule, 
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}