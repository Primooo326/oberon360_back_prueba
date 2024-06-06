import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { CopClient } from "./client.entity";

@Entity('CLI002CLIENTE_UBICACION')
export class CopClientUbication {
    @PrimaryColumn({ type: 'bigint' })
    CLIUBIC_ID_REG: number;

    @Column()
    CLIUBIC_ID_CLIENTE: number;

    @ManyToOne(() => CopClient, (copClient) => copClient.copClientUbication)
    @JoinColumn({name: 'CLIUBIC_ID_CLIENTE'})
    copClient: CopClient;

    @Column({ type: 'nvarchar' })
    CLIUBIC_NOMBRE: string;

    @Column({ type: 'char' })
    CLIUBIC_TIPO_DIRECCION: string;

    @Column({ type: 'nvarchar' })
    CLIUBIC_DIRECCION: string;

    @Column({ type: 'nvarchar' })
    CLIUBIC_ID_LOC_GEO_NV2: string;

    @Column({ type: 'nvarchar' })
    CLIUBIC_LATITUD: string;

    @Column({ type: 'nvarchar' })
    CLIUBIC_LONGITUD: string;

    @Column({ type: 'nvarchar' })
    CLIUBIC_DIRNORMAL: string;

    @Column({ type: 'datetime' })
    CLIUBIC_FECHA: string;

    @Column({ type: 'char' })
    CLIUBIC_STATUS: string;

    @Column({ type: 'datetime' })
    CLIUBIC_INSERT_DATE: string;

    @Column({ type: 'nvarchar' })
    CLIUBIC_INSERT_WINUSR: string;

    @Column({ type: 'nvarchar' })
    CLIUBIC_INSERT_MACHINE: string;

    @Column({ type: 'nvarchar' })
    CLIUBIC_INSERT_MAC: string;

    @Column({ type: 'nvarchar' })
    CLIUBIC_INSERT_IP: string;

    @Column({ type: 'bigint' })
    CLIUBIC_INSERT_SESSION_ID: number;

    @Column({ type: 'bigint' })
    CLIUBIC_INSERT_USER_ID: number;

    @Column({ type: 'datetime' })
    CLIUBIC_UPDATE_DATE: string;

    @Column({ type: 'nvarchar' })
    CLIUBIC_UPDATE_WINUSR: string;

    @Column({ type: 'nvarchar' })
    CLIUBIC_UPDATE_MACHINE: string;

    @Column({ type: 'nvarchar' })
    CLIUBIC_UPDATE_MAC: string;

    @Column({ type: 'nvarchar' })
    CLIUBIC_UPDATE_IP: string;

    @Column({ type: 'bigint' })
    CLIUBIC_UPDATE_SESSION_ID: number;

    @Column({ type: 'bigint' })
    CLIUBIC_UPDATE_USER_ID: number;
}