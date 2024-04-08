import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './utils/setup-swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SP_DEFAULT } from './config/constanst';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  const configService = app.get(ConfigService);
  
  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

  setupSwagger(app);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const port = configService.get<number>(SP_DEFAULT);
  await app.listen(port);
}
bootstrap();
