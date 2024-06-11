import { Module } from '@nestjs/common';
import { PointsService } from './points.service';
import { PointsController } from './points.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapPoint } from './entities/map-point.entity';
import { JwtStrategy } from 'apps/oberon360-api/src/jwt/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([MapPoint], 'MAP'),
  ],
  controllers: [PointsController],
  providers: [PointsService, JwtStrategy],
})
export class PointsModule {}
