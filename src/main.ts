import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FilterError } from './common/errors/filter/exception.filter';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new FilterError());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
