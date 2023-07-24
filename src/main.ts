import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters(new HttpExceptionFilter()); // global-scoped exception filter
  // app.useGlobalPipes(new ValidationPipe()); // global-scoped pipe
  // app.useGlobalGuards(new RolesGuard()); // In the case of hybrid apps the useGlobalGuards() method doesn't set up guards for gateways and micro services by default (see Hybrid application for information on how to change this behavior). For "standard" (non-hybrid) microservice apps, useGlobalGuards() does mount the guards globally.
  await app.listen(3000);
}
bootstrap();
