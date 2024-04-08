import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Attendance } from "src/modules/attendance/entities/attendance.entity";
import { Employee } from "src/modules/easy-recognition/entities/employee.entity";

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