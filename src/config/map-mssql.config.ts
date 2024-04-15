import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Driver } from "src/modules/map/entities/driver.entity";
import { EventPlate } from "src/modules/map/entities/event-plate.entity";
import { ItineraryAssignment } from "src/modules/map/entities/itinerary-assignment.entity";
import { ItineraryPoint } from "src/modules/map/entities/itinerary-point.entity";
import { Itinerary } from "src/modules/map/entities/itinerary.entity";
import { Point } from "src/modules/map/entities/point.entity";
import { Vehicle } from "src/modules/map/entities/vehicle.entity";

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
        entities: [Vehicle, EventPlate, ItineraryAssignment, Itinerary, ItineraryPoint, Point, Driver],    
        synchronize: false,
        logging: false
    }
}