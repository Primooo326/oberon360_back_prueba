import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { OcUser } from "../modules/user/entities/oc-user.entity";
import { OcUserZone } from "apps/oberon360-web/src/modules/map/entities/user-zone.entity";
import { OcZProtocolo } from "apps/oberon360-web/src/modules/map/entities/z-protocolos.entity";
import { OcZEventos } from "apps/oberon360-web/src/modules/map/entities/z-events.entity";

export const OcMssqlConfig = (host: string, port:string, database: string, username: string, password: string): 
TypeOrmModuleOptions =>  {
    return {
        name: 'OC',
        type: 'mssql',
        host: host,
        port: parseInt(port),
        username: username,
        password: password,
        database: database,
        entities: [OcUser, OcUserZone, OcZProtocolo, OcZEventos],
        synchronize: false,
        logging: false
    }
}