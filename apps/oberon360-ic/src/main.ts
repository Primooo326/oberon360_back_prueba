import { NestFactory } from '@nestjs/core';
import { Oberon360IcModule } from './oberon360-ic.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bodyParser from 'body-parser';
import * as moment from 'moment-timezone';
import { setupSwagger } from 'apps/oberon360-api/src/utils/setup-swagger';
import { SP_OBERON360IC } from 'apps/oberon360-api/src/config/constanst';

async function bootstrap() {
  const app = await NestFactory.create(Oberon360IcModule);

  moment.tz.setDefault('America/Bogota');

  app.enableCors();
  const configService = app.get(ConfigService);
  
  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

  setupSwagger(app);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const port = configService.get<number>(SP_OBERON360IC);
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}/api`);
}
bootstrap();