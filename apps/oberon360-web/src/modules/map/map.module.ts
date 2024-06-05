import { Module } from '@nestjs/common';
import { MapService } from './map.service';
import { MapController } from './map.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientUbication } from './entities/client-ubication.entity';
import { JwtStrategy } from 'apps/oberon360-api/src/jwt/jwt.strategy';
import { Client } from './entities/client.entity';
import { Vehicle } from './entities/vehicle.entity';
import { EventPlate } from './entities/event-plate.entity';
import { OpeGps } from './entities/ope-gps.entity';
import { ItineraryAssignment } from './entities/itinerary-assignment.entity';
import { Itinerary } from './entities/itinerary.entity';
import { ItineraryPoint } from './entities/itinerary-point.entity';
import { ItineraryPointExecuted } from './entities/itinerary-point-executed.entity';
import { Point } from './entities/point.entity';
import { User } from 'apps/oberon360-api/src/modules/user/entities/user.entity';
import { ZProtocolo } from './entities/z-protocolos.entity';
import { ZEventos } from './entities/z-events.entity';
import { Driver } from '../parameters/driver/entities/driver.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientUbication, Client], 'COP'),
    TypeOrmModule.forFeature([User, ZProtocolo, ZEventos], 'OC'),
    TypeOrmModule.forFeature([Vehicle, EventPlate, ItineraryAssignment, Itinerary, ItineraryPoint, Driver, ItineraryPointExecuted, Point], 'MAP'),
    TypeOrmModule.forFeature([OpeGps], 'MDA'),
  ],
  controllers: [MapController],
  providers: [MapService, JwtStrategy],
})
export class MapModule {}
