import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('COP043_CONDUCTOR')
export class Driver {
    @PrimaryColumn({ type: 'bigint'})
    CONDUCTOR_ID: string;

    @Column({ type: 'char'})
    CONDUCTOR_ID_TIPOIDENTIFICACION: string;

    @Column({ type: 'nvarchar'})
    CONDUCTOR_IDENTIFICACION: string;

    @Column({ type: 'nvarchar'})
    CONDUCTOR_CODCONDUCTOR: string;

    @Column({ type: 'nvarchar'})
    CONDUCTOR_PRIMERNOMBRE: string;

    @Column({ type: 'nvarchar'})
    CONDUCTOR_SEGUNDONOMBRE: string;

    @Column({ type: 'nvarchar'})
    CONDUCTOR_PRIMERAPELLIDO: string;

    @Column({ type: 'nvarchar'})
    CONDUCTOR_SEGUNDOAPELLIDO: string;

    @Column({ type: 'nvarchar'})
    CONDUCTOR_ID_RH: string;

    @Column({ type: 'nvarchar'})
    CONDUCTOR_TELPERSONAL: string;

    @Column({ type: 'nvarchar'})
    CONDUCTOR_TELCORPORATIVO: string;

    @Column({ type: 'nvarchar'})
    CONDUCTOR_CORREO: string;

    @Column({ type: 'nvarchar'})
    CONDUCTOR_FOTO: string;

    @Column({ type: 'nvarchar'})
    CONDUCTOR_ESTADO: string;
}