import { OcUserZone } from "apps/oberon360-web/src/modules/map/entities/oc-user-zone.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"

@Entity('SEC002_USER')
export class OcUser {
    @PrimaryColumn({ type: 'bigint'})
    SUSU_ID_REG: number;

    @Column({ type: 'nvarchar'})
    SUSU_ID: string | number;

    @Column({ type: 'nvarchar'})
    SUSU_NAME: string;

    @Column({ type: 'nvarchar'})
    SUSU_PWD: string;

    @Column({ type: 'nvarchar'})
    SUSU_CARGO: string;

    @Column({ type: 'nvarchar'})
    SUSU_TEL: string;

    @Column({ type: 'nvarchar'})
    SUSU_EMAIL: string;

    @Column({ type: 'datetime'})
    SUSU_PWD_DATE: string;

    @Column({ type: 'smallint'})
    SUSU_PWD_DAYS: number;

    @Column({ type: 'char'})
    SUSU_STATUS: string;

    @Column({ type: 'datetime'})
    SUSU_INSERT_DATE: string;

    @Column({ type: 'nvarchar'})
    SUSU_INSERT_WINUSR: string;

    @Column({ type: 'nvarchar'})
    SUSU_INSERT_MACHINE: string;

    @Column({ type: 'nvarchar'})
    SUSU_INSERT_MAC: string;

    @Column({ type: 'nvarchar'})
    SUSU_INSERT_IP: string;

    @Column({ type: 'bigint'})
    SUSU_INSERT_SESSION_ID: number;

    @Column({ type: 'bigint'})
    SUSU_INSERT_USER_ID: number;

    @Column({ type: 'datetime'})
    SUSU_UPDATE_DATE: string;

    @Column({ type: 'nvarchar'})
    SUSU_UPDATE_WINUSR: string;

    @Column({ type: 'nvarchar'})
    SUSU_UPDATE_MACHINE: string;

    @Column({ type: 'nvarchar'})
    SUSU_UPDATE_MAC: string;

    @Column({ type: 'nvarchar'})
    SUSU_UPDATE_IP: string;

    @Column({ type: 'nvarchar'})
    SUSU_ROL: string;

    @Column({ type: 'datetime'})
    SUSU_FECHA_ULT_CAMBIO: string;

    @Column({ type: 'bigint'})
    SUSU_UPDATE_SESSION_ID: number;

    @Column({ type: 'bigint'})
    SUSU_UPDATE_USER_ID: number;

    @Column({ type: 'bigint'})
    SUSU_MODULE: number;

    @Column({ type: 'bigint'})
    SUSU_CLIENTE_ID: number;

    @Column()
    SUSU_USER_ZONE_ID: number;

    @ManyToOne(() => OcUserZone, (ocUserZone) => ocUserZone.ocUser)
    @JoinColumn({name: 'SUSU_USER_ZONE_ID'})
    ocUserZone: OcUserZone;

    @Column({ type: 'datetime'})
    SUSU_UPDATE_PASS: Date;

    @Column({ type: 'nvarchar'})
    SUSU_IDENTIFICACION: string;
}