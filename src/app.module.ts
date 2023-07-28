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
import { ConfigModule } from './config/config.module';
import { logger } from './middlewares/functional-logger.middleware';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { CommonService } from './common/common.service';

@Module({
  imports: [
    CatsModule,
    ConfigModule,
    // ConfigurableModule.jaime({ folder: './folder' }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CommonService,
    // { // necessary for global filters
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
    // { // necessary for global pipes
    //   provide: APP_PIPE,
    //   useClass: ValidationPipe,
    //   scope: Scope.REQUEST,
    // },
    // { // necessary for global guards
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    //   scope: Scope.REQUEST,
    //   durable: true,
    // },
    // { // necessary for global interceptors
    //   provide: APP_INTERCEPTOR,
    //   useClass: LoggingInterceptor,
    //   scope: Scope.TRANSIENT,
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
