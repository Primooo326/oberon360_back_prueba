import { Module } from '@nestjs/common';
import { TravelReasonService } from './travel-reason.service';
import { TravelReasonController } from './travel-reason.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapTravelReason } from './entities/map-travel-reason.entity';
import { JwtStrategy } from 'apps/oberon360-api/src/jwt/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([MapTravelReason], 'MAP'),
  ],
  controllers: [TravelReasonController],
  providers: [TravelReasonService, JwtStrategy],
})
export class TravelReasonModule {}
