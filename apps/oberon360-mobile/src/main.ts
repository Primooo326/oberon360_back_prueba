import { NestFactory } from '@nestjs/core';
import { Oberon360MobileModule } from './oberon360-mobile.module';
import * as bodyParser from 'body-parser';
import * as moment from 'moment-timezone';
import { setupSwagger } from 'apps/oberon360-api/src/utils/setup-swagger';
import { ValidationPipe } from '@nestjs/common';
import { SP_OBERON360MOBILE } from 'apps/oberon360-api/src/config/constanst';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(Oberon360MobileModule);

  moment.tz.setDefault('America/Bogota');

  app.enableCors();
  const configService = app.get(ConfigService);
  
  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

  setupSwagger(app);

  app.setGlobalPrefix('oberon360mobile/api');

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const port = configService.get<number>(SP_OBERON360MOBILE);
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}/api`);
}
bootstrap();