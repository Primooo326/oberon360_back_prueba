import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { MapEventPlate } from "apps/oberon360-web/src/modules/map/entities/cop-event-plate.entity";
import { MapFactorRh } from "apps/oberon360-web/src/modules/map/entities/map-factor-rh.entity";
import { MapItineraryAssignment } from "apps/oberon360-web/src/modules/map/entities/map-itinerary-assignment.entity";
import { MapItineraryPointExecuted } from "apps/oberon360-web/src/modules/map/entities/map-itinerary-point-executed.entity";
import { MapItineraryPoint } from "apps/oberon360-web/src/modules/map/entities/map-itinerary-point.entity";
import { MapItinerary } from "apps/oberon360-web/src/modules/map/entities/map-itinerary.entity";
import { MapPoint } from "apps/oberon360-web/src/modules/map/entities/map-point.entity";
import { MapStateIpe } from "apps/oberon360-web/src/modules/map/entities/map-state-ipe.entity";
import { MapTypeIdentification } from "apps/oberon360-web/src/modules/map/entities/map-type-identification.entity";
import { MapVehicle } from "apps/oberon360-web/src/modules/map/entities/map-vehicle.entity";
import { MapActivity } from "apps/oberon360-web/src/modules/parameters/activity/entities/map-activity.entity";
import { MapCategoryNovelty } from "apps/oberon360-web/src/modules/parameters/category-novelty/entities/map-category-novelty.entity";
import { MapClient } from "apps/oberon360-web/src/modules/parameters/category-novelty/entities/map-client.entity";
import { MapDriver } from "apps/oberon360-web/src/modules/parameters/driver/entities/map-driver.entity";
import { MapProtocolResponsible } from "apps/oberon360-web/src/modules/parameters/protocol-responsible/entities/map-protocol-responsible.entity";
import { MapProtocol } from "apps/oberon360-web/src/modules/parameters/protocol/entities/map-protocol.entity";
import { MapSubCategoryNovelty } from "apps/oberon360-web/src/modules/parameters/sub-category-novelty/entities/map-sub-category-novelty.entity";

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
        entities: [MapVehicle, MapEventPlate, MapItineraryAssignment, MapItinerary, MapItineraryPoint, MapPoint, MapDriver, MapItineraryPointExecuted, MapStateIpe, MapTypeIdentification, MapFactorRh, MapProtocol, MapProtocolResponsible, MapActivity, MapCategoryNovelty, MapClient, MapSubCategoryNovelty],    
        synchronize: false,
        logging: false
    }
}