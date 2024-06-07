import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity('COP018_EMPLEADOS')
export class IcpEmployee {
    @PrimaryColumn({ type: 'nvarchar'})
    EMPL_IDEMPLEADO: number;

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

    @Column({ type: 'date'})
    EMPL_FECEGRESO: string;

    @Column({ type: 'varbinary'})
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
    EMPL_INSERT_SESSION_ID: string;

    @Column({ type: 'bigint'})
    EMPL_INSERT_USER_ID: string;

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
    EMPL_UPDATE_SESSION_ID: string;

    @Column({ type: 'bigint'})
    EMPL_UPDATE_USER_ID: string;

    @Column({ type: 'char'})
    EMPL_VACANTE: string;
}