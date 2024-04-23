import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"
import { ClientUbication } from "./client-ubication.entity";
import { Document } from "./document.entity";

@Entity('CLI001CLIENTE')
export class Client {
    @PrimaryColumn({ type: 'bigint'})
    CLIE_ID_REG: number;

    @Column({ type: 'nvarchar'})
    CLIE_ID_REGENTIFICACION: string;

    @Column({ type: 'smallint'})
    CLIE_TIPOID: number;

    @Column({ type: 'char'})
    CLIE_DV: string;

    @Column({ type: 'nvarchar'})
    CLIE_SIGLA: string;

    @Column({ type: 'nvarchar'})
    CLIE_NOMBRE: string;

    @Column({ type: 'nvarchar'})
    CLIE_COMERCIAL: string;

    @Column({ type: 'nvarchar'})
    CLIE_COD_GRUPO_EMPRE: string;

    @Column({ type: 'nvarchar'})
    CLIE_COD_SECTOR: string;

    @Column({ type: 'nvarchar'})
    CLIE_COD_NACIONALIDAD: string;

    @Column({ type: 'bigint'})
    CLIE_COD_ASESOR_COMERCIAL: number;

    @Column({ type: 'nvarchar'})
    CLIE_COD_NIVEL_COMERCIAL: string;

    @Column({ type: 'nvarchar'})
    CLIE_COD_ORIGEN_CONTACTO: string;

    @Column({ type: 'nvarchar'})
    CLIE_PAGINAWEB: string;

    @Column({ type: 'nvarchar'})
    CLIE_LOGO: string;

    @Column({ type: 'char'})
    CLIE_PROSPECTO: string;

    @Column({ type: 'nvarchar'})
    CLIE_CENTCOS: string;

    @Column({ type: 'bigint'})
    CLIE_USER_FACTURISTA: number;

    @Column({ type: 'nvarchar'})
    CLIE_CRENTABILIDAD: string;

    @Column({ type: 'nvarchar'})
    CLIE_PERIODICIDAD_INC: string;

    @Column({ type: 'char'})
    CLIE_STATUS: string;

    @Column({ type: 'datetime'})
    CLIE_INSERT_DATE: string;

    @Column({ type: 'nvarchar'})
    CLIE_INSERT_WINUSR: string;

    @Column({ type: 'nvarchar'})
    CLIE_INSERT_MACHINE: string;

    @Column({ type: 'nvarchar'})
    CLIE_INSERT_MAC: string;

    @Column({ type: 'nvarchar'})
    CLIE_INSERT_IP: string;

    @Column({ type: 'bigint'})
    CLIE_INSERT_SESSION_ID: number;

    @Column({ type: 'bigint'})
    CLIE_INSERT_USER_ID: number;

    @Column({ type: 'datetime'})
    CLIE_UPDATE_DATE: string;

    @Column({ type: 'nvarchar'})
    CLIE_UPDATE_WINUSR: string;

    @Column({ type: 'nvarchar'})
    CLIE_UPDATE_MACHINE: string;

    @Column({ type: 'nvarchar'})
    CLIE_UPDATE_MAC: string;

    @Column({ type: 'nvarchar'})
    CLIE_UPDATE_IP: string;

    @Column({ type: 'bigint'})
    CLIE_UPDATE_SESSION_ID: number;

    @Column({ type: 'bigint'})
    CLIE_UPDATE_USER_ID: number;

    @Column({ type: 'nvarchar'})
    CLIE_COD_ALTERNO: string;

    @Column({ type: 'nvarchar'})
    CLIE_FILENAME: string;

    @Column({ type: 'smallint'})
    CLIE_DIAS_ENTREGA: number;

    @Column({ type: 'char'})
    CLIE_COP: string;

    @OneToMany(() => ClientUbication, (clientUbication) => clientUbication.client)
    clientUbication: ClientUbication[];

    @OneToMany(() => Document, (document) => document.client)
    document: Document[];
}