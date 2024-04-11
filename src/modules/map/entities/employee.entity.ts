import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('CO_107_OPE_EMPLEADOS')
export class Employee {
    @PrimaryColumn({ type: 'nvarchar'})
    EMPL_IDEMPLEADO: string;

    @Column({ type: 'nvarchar'})
    EMPL_IDENTIFICACION: string;

    @Column({ type: 'nvarchar'})
    EMPL_PASSWORD: string;

    @Column({ type: 'nvarchar'})
    EMPL_APELLIDOS: string;

    @Column({ type: 'nvarchar'})
    EMPL_NOMBRES: string;

    @Column({ type: 'date'})
    EMPL_FECINGRESO: string;

    @Column({ type: 'nvarchar'})
    EMPL_FOTO: string;

    @Column({ type: 'nvarchar'})
    EMPL_CARGOID: string;

    @Column({ type: 'nvarchar'})
    EMPL_TIPOCONTR: string;

    @Column({ type: 'nvarchar'})
    EMPL_TELEFONO: string;

    @Column({ type: 'nvarchar'})
    EMPL_DIRECCION: string;

    @Column({ type: 'char'})
    EMPL_ESTADO: string;

    @Column({ type: 'datetime'})
    EMPL_INSERT_DATE: string;

    @Column({ type: 'nvarchar'})
    EMPL_INSERT_WINUSR: string;

    @Column({ type: 'nvarchar'})
    EMPL_INSERT_MACHINE: string;

    @Column({ type: 'nvarchar'})
    EMPL_INSERT_MAC: string;

    @Column({ type: 'nvarchar'})
    EMPL_INSERT_IP: string;

    @Column({ type: 'bigint'})
    EMPL_INSERT_SESSION_ID: number;

    @Column({ type: 'bigint'})
    EMPL_INSERT_USER_ID: number;

    @Column({ type: 'datetime'})
    EMPL_UPDATE_DATE: string;

    @Column({ type: 'nvarchar'})
    EMPL_UPDATE_WINUSR: string;

    @Column({ type: 'nvarchar'})
    EMPL_UPDATE_MACHINE: string;

    @Column({ type: 'nvarchar'})
    EMPL_UPDATE_MAC: string;

    @Column({ type: 'nvarchar'})
    EMPL_UPDATE_IP: string;

    @Column({ type: 'bigint'})
    EMPL_UPDATE_SESSION_ID: number;

    @Column({ type: 'bigint'})
    EMPL_UPDATE_USER_ID: number;

    @Column({ type: 'nvarchar'})
    TIPODOCUMENTO_ID: string;

    @Column({ type: 'varbinary'})
    EMPL_FOTOE: string;

    @Column({ type: 'nvarchar'})
    EMPL_CIUDADOP: string;

    @Column({ type: 'nvarchar'})
    EMPL_CODIGOCAJA: string;
}