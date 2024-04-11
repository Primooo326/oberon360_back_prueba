import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { OpeGps } from "src/modules/map/entities/ope-gps.entity";

export const MdaMssqlConfig = (host: string, port:string, database: string, username: string, password: string): 
TypeOrmModuleOptions =>  {
    return {
        name: 'MDA',
        type: 'mssql',
        host: host,
        port: parseInt(port),
        username: username,
        password: password,
        database: database,
        entities: [OpeGps],    
        synchronize: false,
        logging: false
    }
}