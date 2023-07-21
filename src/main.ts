import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters(new HttpExceptionFilter()); // global-scoped exception filter
  // app.useGlobalPipes(new ValidationPipe()); // global-scoped pipe
  await app.listen(3000);
}
bootstrap();
