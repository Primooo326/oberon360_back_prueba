import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { EventPlate } from "src/modules/map/entities/event-plate.entity";
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
        entities: [Vehicle, EventPlate],    
        synchronize: false,
        logging: false
    }
}