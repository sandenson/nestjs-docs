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
import { CommonModule } from './common/common.module';
import { ConfigModule } from './config/config.module';
import { logger } from './middlewares/functional-logger.middleware';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { TestModule } from './test/test.module';
import { TestService } from './test/test.service';

@Module({
  imports: [
    CatsModule,
    ConfigModule,
    CommonModule,
    TestModule,
    // ConfigurableModule.jaime({ folder: './folder' }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    TestService,
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
    // { // necessary for global interceptors to be able to be overridden in tests
    //   provide: APP_INTERCEPTOR,
    //   useExisting: LoggingInterceptor,
    //   scope: Scope.TRANSIENT,
    // },
    // LoggingInterceptor
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
