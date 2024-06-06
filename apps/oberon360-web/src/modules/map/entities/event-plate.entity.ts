import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity('OPE013_WT_EVENTOS')
export class MapEventPlate {
    @PrimaryColumn({ type: 'numeric'})
    WTEVNT_ID: number;

    @Column({ type: 'nvarchar'})
    WTEVNT_PLACA: string;

    @Column({ type: 'nvarchar'})
    WTEVNT_LAT: string;

    @Column({ type: 'nvarchar'})
    WTEVNT_LON: string;

    @Column({ type: 'nvarchar'})
    WTEVNT_SPEED: string;

    @Column({ type: 'nvarchar'})
    WTEVNT_DATE_GPS: string;

    @Column({ type: 'nvarchar'})
    WTEVNT_LOCATION: string;

    @Column({ type: 'nvarchar'})
    WTEVNT_EVENTID: string;

    @Column({ type: 'nvarchar'})
    WTEVNT_EVENTO: string;

    @Column({ type: 'nvarchar'})
    WTEVNT_MOBILEID: string;

    @Column({ type: 'datetime'})
    WTEVNT_INSERT_DATE: string;

    @Column({ type: 'nvarchar'})
    WTEVNT_INSERT_WINUSR: string;

    @Column({ type: 'nvarchar'})
    WTEVNT_INSERT_MACHINE: string;

    @Column({ type: 'nvarchar'})
    WTEVNT_INSERT_MAC: string;

    @Column({ type: 'nvarchar'})
    WTEVNT_INSERT_IP: string;

    @Column({ type: 'bigint'})
    WTEVNT_INSERT_SESSION_ID: number;

    @Column({ type: 'bigint'})
    WTEVNT_INSERT_USER_ID: number;

    @Column({ type: 'datetime'})
    WTEVNT_DATE_GPS_2: string;

    @Column({ type: 'int'})
    WTEVNT_DISTANCIA: number;
}