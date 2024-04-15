import { Module } from '@nestjs/common';
import { MapService } from './map.service';
import { MapController } from './map.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientUbication } from './entities/client-ubication.entity';
import { JwtStrategy } from 'src/jwt/jwt.strategy';
import { Client } from './entities/client.entity';
import { User } from '../user/entities/user.entity';
import { Vehicle } from './entities/vehicle.entity';
import { EventPlate } from './entities/event-plate.entity';
import { OpeGps } from './entities/ope-gps.entity';
import { ItineraryAssignment } from './entities/itinerary-assignment.entity';
import { Itinerary } from './entities/itinerary.entity';
import { ItineraryPoint } from './entities/itinerary-point.entity';
import { Driver } from './entities/driver.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientUbication, Client], 'COP'),
    TypeOrmModule.forFeature([User], 'OC'),
    TypeOrmModule.forFeature([Vehicle, EventPlate, ItineraryAssignment, Itinerary, ItineraryPoint, Driver], 'MAP'),
    TypeOrmModule.forFeature([OpeGps], 'MDA'),
  ],
  controllers: [MapController],
  providers: [MapService, JwtStrategy],
})
export class MapModule {}
