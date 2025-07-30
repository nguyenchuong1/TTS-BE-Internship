import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auths/auth.module';
import { CatsModule } from './cats/cats.module';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import { TasksModule } from './tasks/tasks.module';
import { TaskLinksModule } from './task-links/task-links.module';
import { TaskHistoriesModule } from './task-histories/task-histories.module';
import { TaskCommentsModule } from './task-comments/task-comments.module';
import { dataSourceOptions } from 'db/data-source';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot(dataSourceOptions),
    CatsModule,
    AuthModule,
    UsersModule,
    TodosModule,
    TasksModule,
    TaskLinksModule,
    TaskHistoriesModule,
    TaskCommentsModule,
  ],
})
export class AppModule {}
