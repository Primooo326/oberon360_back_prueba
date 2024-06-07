import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('COP092_VEHICULO')
export class MapVehicle {
    @PrimaryColumn({ type: 'smallint'})
    VEHICULO_ID: number;

    @Column({ type: 'nvarchar'})
    VEHICULO_PLACA: string;

    @Column({ type: 'smallint'})
    VEHICULO_MARCA: number;

    @Column({ type: 'smallint'})
    VEHICULO_TIPOVEHICULO: number;

    @Column({ type: 'smallint'})
    VEHICULO_SUB_TIPOVEHICULO: number;

    @Column({ type: 'smallint'})
    VEHICULO_FLOTAID: number;

    @Column({ type: 'char'})
    VEHICULO_STATUS: string;

    @Column({ type: 'datetime'})
    VEHICULO_INSERT_DATE: string;

    @Column({ type: 'nvarchar'})
    VEHICULO_INSERT_WINUSR: string;

    @Column({ type: 'nvarchar'})
    VEHICULO_INSERT_MACHINE: string;

    @Column({ type: 'nvarchar'})
    VEHICULO_INSERT_MAC: string;

    @Column({ type: 'nvarchar'})
    VEHICULO_INSERT_IP: string;

    @Column({ type: 'bigint'})
    VEHICULO_INSERT_SESSION_ID: number;

    @Column({ type: 'bigint'})
    VEHICULO_INSERT_USER_ID: number;

    @Column({ type: 'datetime'})
    VEHICULO_UPDATE_DATE: string;

    @Column({ type: 'nvarchar'})
    VEHICULO_UPDATE_WINUSR: string;

    @Column({ type: 'nvarchar'})
    VEHICULO_UPDATE_MACHINE: string;

    @Column({ type: 'nvarchar'})
    VEHICULO_UPDATE_MAC: string;

    @Column({ type: 'nvarchar'})
    VEHICULO_UPDATE_IP: string;

    @Column({ type: 'bigint'})
    VEHICULO_UPDATE_SESSION_ID: number;

    @Column({ type: 'bigint'})
    VEHICULO_UPDATE_USER_ID: number;

    @Column({ type: 'bigint'})
    VEHICULO_PUNTO: number;
}