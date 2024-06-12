import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { MapEventPlate } from "apps/oberon360-web/src/modules/map/entities/cop-event-plate.entity";
import { MapFactorRh } from "apps/oberon360-web/src/modules/map/entities/map-factor-rh.entity";
import { MapItineraryAssignment } from "apps/oberon360-web/src/modules/map/entities/map-itinerary-assignment.entity";
import { MapItineraryPointExecuted } from "apps/oberon360-web/src/modules/map/entities/map-itinerary-point-executed.entity";
import { MapItineraryPoint } from "apps/oberon360-web/src/modules/map/entities/map-itinerary-point.entity";
import { MapItinerary } from "apps/oberon360-web/src/modules/map/entities/map-itinerary.entity";
import { MapStateIpe } from "apps/oberon360-web/src/modules/map/entities/map-state-ipe.entity";
import { MapTypeIdentification } from "apps/oberon360-web/src/modules/map/entities/map-type-identification.entity";
import { MapVehicle } from "apps/oberon360-web/src/modules/map/entities/map-vehicle.entity";
import { MapActivity } from "apps/oberon360-web/src/modules/parameters/activity/entities/map-activity.entity";
import { MapCategoryNovelty } from "apps/oberon360-web/src/modules/parameters/category-novelty/entities/map-category-novelty.entity";
import { MapClient } from "apps/oberon360-web/src/modules/parameters/category-novelty/entities/map-client.entity";
import { MapDriver } from "apps/oberon360-web/src/modules/parameters/driver/entities/map-driver.entity";
import { MapFleetPoints } from "apps/oberon360-web/src/modules/parameters/points/entities/map-fleet-point.entity";
import { MapFleet } from "apps/oberon360-web/src/modules/parameters/points/entities/map-fleet.entity";
import { MapPoint } from "apps/oberon360-web/src/modules/parameters/points/entities/map-point.entity";
import { MapTypePoint } from "apps/oberon360-web/src/modules/parameters/points/entities/map-type-point.entity";
import { MapPreoperationalCategory } from "apps/oberon360-web/src/modules/parameters/preoperational-category/entities/map-preoperational-category.entity";
import { MapPreoperationalSubcategory } from "apps/oberon360-web/src/modules/parameters/preoperational-subcategory/entities/map-preoperational-subcategory.entity";
import { MapProtocolResponsible } from "apps/oberon360-web/src/modules/parameters/protocol-responsible/entities/map-protocol-responsible.entity";
import { MapProtocol } from "apps/oberon360-web/src/modules/parameters/protocol/entities/map-protocol.entity";
import { MapSubCategoryNovelty } from "apps/oberon360-web/src/modules/parameters/sub-category-novelty/entities/map-sub-category-novelty.entity";
import { MapTravelReason } from "apps/oberon360-web/src/modules/parameters/travel-reason/entities/map-travel-reason.entity";

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
        entities: [MapVehicle, MapEventPlate, MapItineraryAssignment, MapItinerary, MapItineraryPoint, MapPoint, MapDriver, MapItineraryPointExecuted, MapStateIpe, MapTypeIdentification, MapFactorRh, MapProtocol, MapProtocolResponsible, MapActivity, MapCategoryNovelty, MapClient, MapSubCategoryNovelty, MapTravelReason, MapPreoperationalCategory, MapPreoperationalSubcategory, MapFleetPoints, MapFleet, MapTypePoint],    
        synchronize: false,
        logging: true
    }
}