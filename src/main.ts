import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FilterError } from './common/errors/filter/exception.filter';
import * as cookie from 'cookie-parser';
async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new FilterError());
  app.use(cookie(process.env.SIGNED_COOKIE));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
