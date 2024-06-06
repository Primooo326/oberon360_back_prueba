import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { MapProtocol } from "../../protocol/entities/protocol.entity";

@Entity('COP026_PREGUNTA_FUNCION')
export class MapActivity {
    @PrimaryColumn({ type: 'nvarchar', length: 20 })
    PREFUN_ID: string;

    @Column({ type: 'nvarchar'})
    PREFUN_PREGUNTA: string;

    @Column({ type: 'char'})
    PREFUN_STATUS: string;

    @OneToMany(() => MapProtocol, (mapProtocol) => mapProtocol.mapActivity)
    mapProtocol: MapProtocol[];
}