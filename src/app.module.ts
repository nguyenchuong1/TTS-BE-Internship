import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './cats/common/middleware/logger.middleware';
import { CatsController } from './cats/cats.controller';
import { AuthModule } from './auths/auth.module';
import { UsersModule } from './users/users.module';
import { CatsService } from './cats/cats.service';
import { AuthController } from './auths/auth.controller';
import { AuthService } from './auths/auth.service';

@Module({
  imports: [AppModule,CatsModule,UsersModule,AuthModule],
  controllers: [CatsController,AuthController],
  providers: [CatsService,AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(CatsController);
  }
}
