import { NestFactory } from '@nestjs/core';
import { Oberon360IcModule } from './oberon360-ic.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bodyParser from 'body-parser';
import * as moment from 'moment-timezone';
import { setupSwagger } from 'apps/oberon360-api/src/utils/setup-swagger';
import { SP_OBERON360IC } from 'apps/oberon360-api/src/config/constanst';
import * as dayjs from 'dayjs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

async function bootstrap() {
  const packageJson = fs.readFileSync('package.json', 'utf8');
  const packageData = JSON.parse(packageJson);

  const app = await NestFactory.create(Oberon360IcModule, { cors: true });
  dayjs.locale('es');

  moment.tz.setDefault('America/Bogota');

  app.setGlobalPrefix('oberon360ic/api');
  app.enableCors();
  const configService = app.get(ConfigService);
  
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  const config = new DocumentBuilder()
    .setTitle('Oberón')
    .setDescription('Oberón Documentation API')
    .setVersion(packageData.version)
    .addTag('Core/Auth')
    .addTag('Core/Modules')
    .addTag('Core/Charges')
    .addTag('Core/Utils')
    .addTag('System/Locations')
    .addTag('System/Parameters')
    .addTag('Operation/Customers')
    .addTag('Operation/Requests')
    .addTag('Operation/Studies')
    .addTag('Operation/Users')
    .addTag('Operation/Roles')
    .addTag('Candidates')
    .addTag('Candidates/Information')
    .addTag('Reports')
    .build();
  setupSwagger(app);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const port = configService.get<number>(SP_OBERON360IC);
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}/api`);
}
bootstrap();