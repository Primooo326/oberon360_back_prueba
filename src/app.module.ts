import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { AttendanceModule } from './attendance/attendance.module';
import { Schedules } from './attendance/entities/schedules.entity';
import { Attendance } from './attendance/entities/attendance.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';
import { EasyRecognitionModule } from './easy-recognition/easy-recognition.module';
import { MapModule } from './modules/map/map.module';
import { ClientUbication } from './modules/map/entities/client-ubication.entity';
import { Client } from './modules/map/entities/client.entity';
import { UserZone } from './modules/map/entities/user-zone.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public')
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      name: 'COP',
      type: 'mssql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_COPNAME,
      entities: [Schedules, ClientUbication, Client],
      synchronize: false
    }),
    TypeOrmModule.forRoot({
      name: 'ICP',
      type: 'mssql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_ICPNAME,
      entities: [Attendance],
      synchronize: false
    }),
    TypeOrmModule.forRoot({
      name: 'OC',
      type: 'mssql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_OCNAME,
      entities: [User, UserZone],
      synchronize: false
    }),
    AttendanceModule,
    AuthModule,
    EasyRecognitionModule,
    MapModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
