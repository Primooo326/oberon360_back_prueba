import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { MapModule } from './modules/map/map.module';
import { AuthModule } from './modules/auth/auth.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { EasyRecognitionModule } from './modules/easy-recognition/easy-recognition.module';
import { OcMssqlConfig } from './config/oc-mssql.config';
import { IcpMssqlConfig } from './config/icp-mssql.config';
import { CopMssqlConfig } from './config/cop-mssql.config';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public')
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot( CopMssqlConfig(process.env.DB_HOST, process.env.DB_PORT, process.env.DB_COPNAME, process.env.DB_USER, process.env.DB_PASSWORD) ),
    TypeOrmModule.forRoot( IcpMssqlConfig(process.env.DB_HOST, process.env.DB_PORT, process.env.DB_ICPNAME, process.env.DB_USER, process.env.DB_PASSWORD) ),
    TypeOrmModule.forRoot( OcMssqlConfig(process.env.DB_HOST, process.env.DB_PORT, process.env.DB_OCNAME, process.env.DB_USER, process.env.DB_PASSWORD) ),
    AttendanceModule,
    AuthModule,
    EasyRecognitionModule,
    MapModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
