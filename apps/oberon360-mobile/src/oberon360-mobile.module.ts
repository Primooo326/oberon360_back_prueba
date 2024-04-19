import { Module } from '@nestjs/common';
import { Oberon360MobileController } from './oberon360-mobile.controller';
import { Oberon360MobileService } from './oberon360-mobile.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { EasyRecognitionModule } from './modules/easy-recognition/easy-recognition.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IcpMssqlConfig } from 'apps/oberon360-api/src/config/icp-mssql.config';
import { OcMssqlConfig } from 'apps/oberon360-api/src/config/oc-mssql.config';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public')
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot( OcMssqlConfig(process.env.DB_HOST, process.env.DB_PORT, process.env.DB_OCNAME, process.env.DB_USER, process.env.DB_PASSWORD) ),
    TypeOrmModule.forRoot( IcpMssqlConfig(process.env.DB_HOST, process.env.DB_PORT, process.env.DB_ICPNAME, process.env.DB_USER, process.env.DB_PASSWORD) ),
    EasyRecognitionModule,
  ],
  controllers: [Oberon360MobileController],
  providers: [Oberon360MobileService],
})
export class Oberon360MobileModule {}
