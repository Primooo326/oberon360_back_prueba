import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"
import { MapItineraryPoint } from "./map-itinerary-point.entity";

@Entity('COP086_ITINERARIO')
export class MapItinerary {
    @PrimaryColumn({ type: 'bigint'})
    ITINE_ID: number;

    @Column({ type: 'nvarchar'})
    ITINE_NOMBRE: string;

    @Column({ type: 'nvarchar'})
    ITINE_ORIGEN: string;

    @Column({ type: 'nvarchar'})
    ITINE_DESTINO: string;

    @OneToMany(() => MapItineraryPoint, (mapItineraryPoint) => mapItineraryPoint.mapItinerary)
    mapItineraryPoint: MapItineraryPoint[];
}