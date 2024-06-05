import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProtocolResponsible } from "../../protocol-responsible/entities/protocol-responsible.entity";
import { Activity } from "../../activity/entities/activity.entity";

@Entity('COP003_FUNCIONES')
export class Protocol {
    @PrimaryGeneratedColumn()
    FUN_ID: number;

    @Column({ type: 'nvarchar', length: 20, nullable: true })
    FUN_CARGOID: string | null;

    @Column({ type: 'nvarchar', length: 20, nullable: false })
    FUN_TIPOFUNID: string;

    @ManyToOne(() => ProtocolResponsible, (protocolResponsible) => protocolResponsible.protocol, { nullable: true })
    @JoinColumn({ name: 'FUN_TIPOFUNID' })
    protocolResponsible: ProtocolResponsible;

    @Column({ type: 'nvarchar', length: 20, nullable: false })
    FUN_PREG_ID: string;

    @ManyToOne(() => Activity, (activity) => activity.protocol, { nullable: true })
    @JoinColumn({ name: 'FUN_PREG_ID' })
    activity: Activity;

    @Column({ type: 'nvarchar', nullable: false })
    FUN_FUNCION: string;

    @Column({ type: 'char', default: '1', nullable: false })
    FUN_STATUS: string;
}