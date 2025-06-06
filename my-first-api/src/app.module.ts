import { Module ,NestModule,MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './cats/common/middleware/logger.middleware';
import { CatsController } from './cats/cats.controller';
@Module({
  imports: [CatsModule],
  controllers: [ AppController],
  providers: [ AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(CatsController);
}
}
