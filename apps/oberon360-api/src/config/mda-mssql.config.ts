import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { MdaOpeGps } from "apps/oberon360-web/src/modules/map/entities/mda-ope-gps.entity";

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
        entities: [MdaOpeGps],    
        synchronize: false,
        logging: false
    }
}