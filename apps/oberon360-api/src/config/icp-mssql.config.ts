import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Employee } from "apps/oberon360-mobile/src/modules/easy-recognition/entities/employee.entity";
import { Attendance } from "apps/oberon360-web/src/modules/attendance/entities/attendance.entity";

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
        entities: [Attendance, Employee],
        synchronize: false,
        logging: false
    }
}