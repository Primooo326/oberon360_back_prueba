import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { IcpEmployee } from "apps/oberon360-mobile/src/modules/easy-recognition/entities/icp-employee.entity";
import { IcpAttendance } from "apps/oberon360-web/src/modules/attendance/entities/icp-attendance.entity";

export const IcpMssqlConfig = (host: string, port:string, database: string, username: string, password: string): 
TypeOrmModuleOptions =>  {
    return {
        name: 'ICP',
        type: 'mssql',
        host: host,
        port: parseInt(port),
        username: username,
        password: password,
        database: database,
        entities: [IcpAttendance, IcpEmployee],
        synchronize: false,
        logging: false
    }
}