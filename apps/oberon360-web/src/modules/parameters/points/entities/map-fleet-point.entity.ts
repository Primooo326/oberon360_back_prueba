import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { MapPoint } from "./map-point.entity";
import { MapFleet } from "./map-fleet.entity";

@Entity('COP094_PUNTO_FLOTA')
export class MapFleetPoints {
    @PrimaryColumn({ type: 'bigint'})
    PUNFLOTA_ID: number;

    @Column()
    PUNFLOTA_IDPUNTO: number;

    @ManyToOne(() => MapPoint, (mapPoint) => mapPoint.mapFleetPoints)
    @JoinColumn({name: 'PUNFLOTA_IDPUNTO'})
    mapPoint: MapPoint;

    @Column()
    PUNFLOTA_IDFLOTA: number;

    @ManyToOne(() => MapFleet, (mapFleet) => mapFleet.mapFleetPoints)
    @JoinColumn({name: 'PUNFLOTA_IDFLOTA'})
    mapFleet: MapFleet;

    @Column({ type: 'char'})
    PUNFLOTA_STATUS: string;
}