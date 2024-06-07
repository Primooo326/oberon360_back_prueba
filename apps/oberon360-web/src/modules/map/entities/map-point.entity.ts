import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"
import { MapItineraryPoint } from "./map-itinerary-point.entity";
import { MapItineraryPointExecuted } from "./map-itinerary-point-executed.entity";

@Entity('COP089_PUNTOS')
export class MapPoint {
    @PrimaryColumn({ type: 'bigint'})
    PUN_ID: number;

    @Column({ type: 'nvarchar'})
    PUN_NOMBRE: string;

    @Column({ type: 'nvarchar'})
    PUN_LATITUD: string;

    @Column({ type: 'nvarchar'})
    PUN_LONGITUD: string;

    @OneToMany(() => MapItineraryPoint, (mapItineraryPoint) => mapItineraryPoint.mapPoint)
    mapItineraryPoint: MapItineraryPoint[];

    @OneToMany(() => MapItineraryPointExecuted, (mapItineraryPointExecuted) => mapItineraryPointExecuted.mapPoint)
    mapItineraryPointExecuted: MapItineraryPointExecuted[];
}