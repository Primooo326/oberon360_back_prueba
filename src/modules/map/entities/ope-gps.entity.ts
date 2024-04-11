import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('CO_118_OPE_GPS')
export class OpeGps {
    @PrimaryColumn({ type: 'numeric'})
    GPS_ID: number;

    @Column({ type: 'nvarchar'})
    GPS_IMEI: string;

    @Column({ type: 'date'})
    GPS_FECHA: string;

    @Column({ type: 'datetime'})
    GPS_FECHASAT: string;

    @Column({ type: 'nvarchar'})
    GPS_LAT: string;

    @Column({ type: 'nvarchar'})
    GPS_LON: string;

    @Column({ type: 'numeric'})
    GPS_VELOCIDAD: number;

    @Column({ type: 'nvarchar'})
    GPS_INFOSAT: string;

    @Column({ type: 'nvarchar'})
    GPS_EMPLEADOID: string;

    @Column({ type: 'datetime'})
    GPS_INSERT_DATE: string;

    @Column({ type: 'nvarchar'})
    GPS_INSERT_WINUSR: string;

    @Column({ type: 'nvarchar'})
    GPS_INSERT_MACHINE: string;

    @Column({ type: 'nvarchar'})
    GPS_INSERT_MAC: string;

    @Column({ type: 'nvarchar'})
    GPS_INSERT_IP: string;

    @Column({ type: 'bigint'})
    GPS_INSERT_SESSION_ID: number;

    @Column({ type: 'bigint'})
    GPS_INSERT_USER_ID: number;

    @Column({ type: 'datetime'})
    GPS_UPDATE_DATE: string;

    @Column({ type: 'nvarchar'})
    GPS_UPDATE_WINUSR: string;

    @Column({ type: 'nvarchar'})
    GPS_UPDATE_MACHINE: string;

    @Column({ type: 'nvarchar'})
    GPS_UPDATE_MAC: string;

    @Column({ type: 'nvarchar'})
    GPS_UPDATE_IP: string;

    @Column({ type: 'bigint'})
    GPS_UPDATE_SESSION_ID: number;

    @Column({ type: 'bigint'})
    GPS_UPDATE_USER_ID: number;
}