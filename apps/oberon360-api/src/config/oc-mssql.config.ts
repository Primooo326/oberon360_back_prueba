import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { OcUser } from "../modules/user/entities/oc-user.entity";
import { OcZProtocolo } from "apps/oberon360-web/src/modules/map/entities/oc-z-protocolos.entity";
import { OcUserZone } from "apps/oberon360-web/src/modules/map/entities/oc-user-zone.entity";
import { OcZEventos } from "apps/oberon360-web/src/modules/map/entities/oc-z-events.entity";

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