import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Schedules } from "src/modules/attendance/entities/schedules.entity";
import { ClientUbication } from "src/modules/map/entities/client-ubication.entity";
import { Client } from "src/modules/map/entities/client.entity";
import { DocumentService } from "src/modules/map/entities/document-service.entiy";
import { Document } from "src/modules/map/entities/document.entity";
import { InventoryTree } from "src/modules/map/entities/inventory-tree.entity";
import { LineService } from "src/modules/map/entities/line-service.entity";

export const CopMssqlConfig = (host: string, port:string, database: string, username: string, password: string): 
TypeOrmModuleOptions =>  {
    return {
        name: 'COP',
        type: 'mssql',
        host: host,
        port: parseInt(port),
        username: username,
        password: password,
        database: database,
        entities: [Schedules, ClientUbication, Client, Document, DocumentService, InventoryTree, LineService],
        synchronize: false,
        logging: false
    }
}