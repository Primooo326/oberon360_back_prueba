import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('COP003_FUNCIONES')
export class Protocol {
    @PrimaryGeneratedColumn({ type: 'numeric'})
    FUN_ID: number;

    @Column({ type: 'nvarchar'})
    FUN_CARGOID: string;

    @Column({ type: 'nvarchar'})
    FUN_TIPOFUNID: string;

    @Column({ type: 'nvarchar'})
    FUN_PREG_ID: string;

    @Column({ type: 'nvarchar'})
    FUN_FUNCION: string;

    @Column({ type: 'char'})
    FUN_STATUS: string;
}