import { Module } from '@nestjs/common';
import { Oberon360WebController } from './oberon360-web.controller';
import { Oberon360WebService } from './oberon360-web.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { MapModule } from './modules/map/map.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CopMssqlConfig } from 'apps/oberon360-api/src/config/cop-mssql.config';
import { IcpMssqlConfig } from 'apps/oberon360-api/src/config/icp-mssql.config';
import { OcMssqlConfig } from 'apps/oberon360-api/src/config/oc-mssql.config';
import { MapMssqlConfig } from 'apps/oberon360-api/src/config/map-mssql.config';
import { MdaMssqlConfig } from 'apps/oberon360-api/src/config/mda-mssql.config';
import { DriverModule } from './modules/driver/driver.module';
import { ProtocolModule } from './modules/protocol/protocol.module';

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
    TypeOrmModule.forRoot( CopMssqlConfig(process.env.DB_HOST, process.env.DB_PORT, process.env.DB_COPNAME, process.env.DB_USER, process.env.DB_PASSWORD) ),
    TypeOrmModule.forRoot( MapMssqlConfig(process.env.DB_HOST, process.env.DB_PORT, process.env.DB_MAPNAME, process.env.DB_USER, process.env.DB_PASSWORD) ),
    TypeOrmModule.forRoot( MdaMssqlConfig(process.env.DB_HOST, process.env.DB_PORT, process.env.DB_MDANAME, process.env.DB_USER, process.env.DB_PASSWORD) ),
    AttendanceModule,
    MapModule,
    DriverModule,
    ProtocolModule,
  ],
  controllers: [Oberon360WebController],
  providers: [Oberon360WebService],
})
export class Oberon360WebModule {}
