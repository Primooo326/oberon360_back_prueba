import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { CopSchedules } from "apps/oberon360-web/src/modules/attendance/entities/cop-schedules.entity";
import { CopClientUbication } from "apps/oberon360-web/src/modules/map/entities/cop-client-ubication.entity";
import { CopClient } from "apps/oberon360-web/src/modules/map/entities/cop-client.entity";
import { CopDocumentService } from "apps/oberon360-web/src/modules/map/entities/cop-document-service.entiy";
import { CopDocument } from "apps/oberon360-web/src/modules/map/entities/cop-document.entity";
import { CopInventoryTree } from "apps/oberon360-web/src/modules/map/entities/cop-inventory-tree.entity";
import { CopLineService } from "apps/oberon360-web/src/modules/map/entities/cop-line-service.entity";

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