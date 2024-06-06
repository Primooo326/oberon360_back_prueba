import { Module } from '@nestjs/common';
import { MapService } from './map.service';
import { MapController } from './map.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CopClientUbication } from './entities/client-ubication.entity';
import { JwtStrategy } from 'apps/oberon360-api/src/jwt/jwt.strategy';
import { CopClient } from './entities/client.entity';
import { MapVehicle } from './entities/vehicle.entity';
import { MapEventPlate } from './entities/event-plate.entity';
import { MdaOpeGps } from './entities/ope-gps.entity';
import { MapItineraryAssignment } from './entities/itinerary-assignment.entity';
import { MapItinerary } from './entities/itinerary.entity';
import { MapItineraryPoint } from './entities/itinerary-point.entity';
import { MapItineraryPointExecuted } from './entities/itinerary-point-executed.entity';
import { MapPoint } from './entities/point.entity';
import { OcZProtocolo } from './entities/z-protocolos.entity';
import { OcZEventos } from './entities/z-events.entity';
import { MapDriver } from '../parameters/driver/entities/driver.entity';
import { OcUser } from 'apps/oberon360-api/src/modules/user/entities/oc-user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CopClientUbication, CopClient], 'COP'),
    TypeOrmModule.forFeature([OcUser, OcZProtocolo, OcZEventos], 'OC'),
    TypeOrmModule.forFeature([MapVehicle, MapEventPlate, MapItineraryAssignment, MapItinerary, MapItineraryPoint, MapDriver, MapItineraryPointExecuted, MapPoint], 'MAP'),
    TypeOrmModule.forFeature([MdaOpeGps], 'MDA'),
  ],
  controllers: [MapController],
  providers: [MapService, JwtStrategy],
})
export class MapModule {}
