import { Module } from '@nestjs/common';
import { MapService } from './map.service';
import { MapController } from './map.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CopClientUbication } from './entities/cop-client-ubication.entity';
import { JwtStrategy } from 'apps/oberon360-api/src/jwt/jwt.strategy';
import { CopClient } from './entities/cop-client.entity';
import { MapVehicle } from './entities/map-vehicle.entity';
import { MapEventPlate } from './entities/cop-event-plate.entity';
import { MdaOpeGps } from './entities/mda-ope-gps.entity';
import { MapItineraryAssignment } from './entities/map-itinerary-assignment.entity';
import { MapItinerary } from './entities/map-itinerary.entity';
import { MapItineraryPoint } from './entities/map-itinerary-point.entity';
import { MapItineraryPointExecuted } from './entities/map-itinerary-point-executed.entity';
import { MapPoint } from './entities/map-point.entity';
import { OcZProtocolo } from './entities/oc-z-protocolos.entity';
import { OcZEventos } from './entities/oc-z-events.entity';
import { MapDriver } from '../parameters/driver/entities/map-driver.entity';
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
