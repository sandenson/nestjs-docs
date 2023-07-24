import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import { logger } from './middlewares/functional-logger.middleware';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [
    AppService,
    // { // necessary for global filters
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
    // { // necessary for global pipes
    //   provide: APP_PIPE,
    //   useClass: ValidationPipe,
    // },
    // { // necessary for global pipes
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'cats', method: RequestMethod.POST })
      .forRoutes(CatsController)
      .apply(logger)
      .exclude('cats/(.+)')
      .forRoutes(CatsController);
  }
}
