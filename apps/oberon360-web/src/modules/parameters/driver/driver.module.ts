import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapDriver } from './entities/map-driver.entity';
import { JwtStrategy } from 'apps/oberon360-api/src/jwt/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([MapDriver], 'MAP'),
  ],
  controllers: [DriverController],
  providers: [DriverService, JwtStrategy],
})
export class DriverModule {}
