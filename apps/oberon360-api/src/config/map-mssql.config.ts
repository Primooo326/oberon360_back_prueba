import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Driver } from "apps/oberon360-web/src/modules/driver/entities/driver.entity";
import { EventPlate } from "apps/oberon360-web/src/modules/map/entities/event-plate.entity";
import { FactorRh } from "apps/oberon360-web/src/modules/map/entities/factor-rh.entity";
import { ItineraryAssignment } from "apps/oberon360-web/src/modules/map/entities/itinerary-assignment.entity";
import { ItineraryPointExecuted } from "apps/oberon360-web/src/modules/map/entities/itinerary-point-executed.entity";
import { ItineraryPoint } from "apps/oberon360-web/src/modules/map/entities/itinerary-point.entity";
import { Itinerary } from "apps/oberon360-web/src/modules/map/entities/itinerary.entity";
import { Point } from "apps/oberon360-web/src/modules/map/entities/point.entity";
import { StateIpe } from "apps/oberon360-web/src/modules/map/entities/state-ipe.entity";
import { TypeIdentification } from "apps/oberon360-web/src/modules/map/entities/type-identification.entity";
import { Vehicle } from "apps/oberon360-web/src/modules/map/entities/vehicle.entity";
import { Protocol } from "apps/oberon360-web/src/modules/protocol/entities/protocol.entity";
import { QuestionFunction } from "apps/oberon360-web/src/modules/protocol/entities/question-function.entity";
import { TypeFunction } from "apps/oberon360-web/src/modules/protocol/entities/type-functions.entity";

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
        entities: [Vehicle, EventPlate, ItineraryAssignment, Itinerary, ItineraryPoint, Point, Driver, ItineraryPointExecuted, StateIpe, TypeIdentification, FactorRh, Protocol, TypeFunction, QuestionFunction],    
        synchronize: false,
        logging: false
    }
}