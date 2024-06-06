import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MapProtocolResponsible } from "../../protocol-responsible/entities/protocol-responsible.entity";
import { MapActivity } from "../../activity/entities/activity.entity";

@Entity('COP003_FUNCIONES')
export class MapProtocol {
    @PrimaryGeneratedColumn()
    FUN_ID: number;

    @Column({ type: 'nvarchar', length: 20, nullable: true })
    FUN_CARGOID: string | null;

    @Column({ type: 'nvarchar', length: 20, nullable: false })
    FUN_TIPOFUNID: string;

    @ManyToOne(() => MapProtocolResponsible, (mapProtocolResponsible) => mapProtocolResponsible.mapProtocol, { nullable: true })
    @JoinColumn({ name: 'FUN_TIPOFUNID' })
    mapProtocolResponsible: MapProtocolResponsible;

    @Column({ type: 'nvarchar', length: 20, nullable: false })
    FUN_PREG_ID: string;

    @ManyToOne(() => MapActivity, (mapActivity) => mapActivity.mapProtocol, { nullable: true })
    @JoinColumn({ name: 'FUN_PREG_ID' })
    mapActivity: MapActivity;

    @Column({ type: 'nvarchar', nullable: false })
    FUN_FUNCION: string;

    @Column({ type: 'char', default: '1', nullable: false })
    FUN_STATUS: string;
}