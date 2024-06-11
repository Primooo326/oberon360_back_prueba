import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { MapProtocol } from "../../protocol/entities/map-protocol.entity";

@Entity('COP004_TIPO_FUNCIONES')
export class MapProtocolResponsible {
    @PrimaryColumn({ type: 'nvarchar', length: 20 })
    TFUN_ID: string;

    @Column({ type: 'nvarchar'})
    TFUN_NOMBRE: string;

    @Column({ type: 'char'})
    TFUN_ORDEN: string;

    @Column({ type: 'char'})
    TFUN_STATUS?: string;

    @Column({ type: 'datetime'})
    TFUN_INSERT_DATE?: string;

    @Column({ type: 'datetime'})
    TFUN_UPDATE_DATE?: string;

    @OneToMany(() => MapProtocol, (mapProtocol) => mapProtocol.mapProtocolResponsible)
    mapProtocol: MapProtocol[];
}