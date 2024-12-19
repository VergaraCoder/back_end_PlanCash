import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FilterError } from './common/errors/filter/exception.filter';
import * as cookie from 'cookie-parser';
import * as bodyParser from 'body-parser';
async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new FilterError());
  app.use(bodyParser.json({ limit: '50mb' }));
  app.enableCors({
    origin:"http://localhost:5173",
    credentials: true,
  });
    
  app.use(cookie(process.env.SIGNED_COOKIE));


  await app.listen(3000);
}
bootstrap();
