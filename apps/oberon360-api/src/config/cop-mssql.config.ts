import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { CopSchedules } from "apps/oberon360-web/src/modules/attendance/entities/schedules.entity";
import { CopClientUbication } from "apps/oberon360-web/src/modules/map/entities/client-ubication.entity";
import { CopClient } from "apps/oberon360-web/src/modules/map/entities/client.entity";
import { CopDocumentService } from "apps/oberon360-web/src/modules/map/entities/document-service.entiy";
import { CopDocument } from "apps/oberon360-web/src/modules/map/entities/document.entity";
import { CopInventoryTree } from "apps/oberon360-web/src/modules/map/entities/inventory-tree.entity";
import { CopLineService } from "apps/oberon360-web/src/modules/map/entities/line-service.entity";

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
        entities: [CopSchedules, CopClientUbication, CopClient, CopDocument, CopDocumentService, CopInventoryTree, CopLineService],
        synchronize: false,
        logging: false
    }
}