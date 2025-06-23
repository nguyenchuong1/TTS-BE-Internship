import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auths/auth.module';
import { CatsModule } from './cats/cats.module';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import { TasksModule } from './tasks/tasks.module';

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
      entities: [__dirname + '/**/*.entity{.ts,.js}'],

      synchronize: true,
    }),

    CatsModule,
    AuthModule,
    UsersModule,
    TodosModule,
    TasksModule,
  ],
})
export class AppModule {}
