import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { MapEventPlate } from "apps/oberon360-web/src/modules/map/entities/event-plate.entity";
import { MapFactorRh } from "apps/oberon360-web/src/modules/map/entities/factor-rh.entity";
import { MapItineraryAssignment } from "apps/oberon360-web/src/modules/map/entities/itinerary-assignment.entity";
import { MapItineraryPointExecuted } from "apps/oberon360-web/src/modules/map/entities/itinerary-point-executed.entity";
import { MapItineraryPoint } from "apps/oberon360-web/src/modules/map/entities/itinerary-point.entity";
import { MapItinerary } from "apps/oberon360-web/src/modules/map/entities/itinerary.entity";
import { MapPoint } from "apps/oberon360-web/src/modules/map/entities/point.entity";
import { MapStateIpe } from "apps/oberon360-web/src/modules/map/entities/state-ipe.entity";
import { MapTypeIdentification } from "apps/oberon360-web/src/modules/map/entities/type-identification.entity";
import { MapVehicle } from "apps/oberon360-web/src/modules/map/entities/vehicle.entity";
import { MapActivity } from "apps/oberon360-web/src/modules/parameters/activity/entities/activity.entity";
import { MapCategory } from "apps/oberon360-web/src/modules/parameters/category/entities/category.entity";
import { MapClient } from "apps/oberon360-web/src/modules/parameters/category/entities/client.entity";
import { MapDriver } from "apps/oberon360-web/src/modules/parameters/driver/entities/driver.entity";
import { MapProtocolResponsible } from "apps/oberon360-web/src/modules/parameters/protocol-responsible/entities/protocol-responsible.entity";
import { MapProtocol } from "apps/oberon360-web/src/modules/parameters/protocol/entities/protocol.entity";

export const MapMssqlConfig = (host: string, port:string, database: string, username: string, password: string): 
TypeOrmModuleOptions =>  {
    return {
        name: 'MAP',
        type: 'mssql',
        host: host,
        port: parseInt(port),
        username: username,
        password: password,
        database: database,
        entities: [MapVehicle, MapEventPlate, MapItineraryAssignment, MapItinerary, MapItineraryPoint, MapPoint, MapDriver, MapItineraryPointExecuted, MapStateIpe, MapTypeIdentification, MapFactorRh, MapProtocol, MapProtocolResponsible, MapActivity, MapCategory, MapClient],    
        synchronize: false,
        logging: false
    }
}