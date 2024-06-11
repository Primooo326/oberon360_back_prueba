import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"
import { MapItineraryPoint } from "../../../map/entities/map-itinerary-point.entity";
import { MapItineraryPointExecuted } from "../../../map/entities/map-itinerary-point-executed.entity";

@Entity('COP089_PUNTOS')
export class MapPoint {
    @PrimaryColumn({ type: 'bigint'})
    PUN_ID: number;

    @Column({ type: 'nvarchar'})
    PUN_NOMBRE: string;

    @Column({ type: 'int'})
    PUN_TIPO: number;

    @Column({ type: 'nvarchar'})
    PUN_LATITUD: string;

    @Column({ type: 'nvarchar'})
    PUN_LONGITUD: string;

    @Column({ type: 'char'})
    PUN_STATUS: string;

    @Column({ type: 'datetime'})
    PUN_INSERT_DATE?: string;

    @Column({ type: 'datetime'})
    PUN_UPDATE_DATE?: string;

    @OneToMany(() => MapItineraryPoint, (mapItineraryPoint) => mapItineraryPoint.mapPoint)
    mapItineraryPoint: MapItineraryPoint[];

    @OneToMany(() => MapItineraryPointExecuted, (mapItineraryPointExecuted) => mapItineraryPointExecuted.mapPoint)
    mapItineraryPointExecuted: MapItineraryPointExecuted[];
}