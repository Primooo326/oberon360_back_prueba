import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapActivity } from './entities/map-activity.entity';
import { JwtStrategy } from 'apps/oberon360-api/src/jwt/jwt.strategy';
import { MapProtocol } from '../protocol/entities/map-protocol.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MapActivity, MapProtocol], 'MAP'),
  ],
  controllers: [ActivityController],
  providers: [ActivityService, JwtStrategy],
})
export class ActivityModule {}
