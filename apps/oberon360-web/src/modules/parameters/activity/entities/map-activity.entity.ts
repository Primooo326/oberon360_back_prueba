import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { MapProtocol } from "../../protocol/entities/map-protocol.entity";

@Entity('COP026_PREGUNTA_FUNCION')
export class MapActivity {
    @PrimaryColumn({ type: 'nvarchar', length: 20 })
    PREFUN_ID: string;

    @Column({ type: 'nvarchar'})
    PREFUN_PREGUNTA: string;

    @Column({ type: 'char'})
    PREFUN_STATUS: string;

    @Column({ type: 'datetime'})
    PREFUN_INSERT_DATE?: string;

    @Column({ type: 'datetime'})
    PREFUN_UPDATE_DATE?: string;

    @OneToMany(() => MapProtocol, (mapProtocol) => mapProtocol.mapActivity)
    mapProtocol: MapProtocol[];
}