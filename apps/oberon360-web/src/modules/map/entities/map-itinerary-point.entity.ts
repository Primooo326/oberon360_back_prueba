import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { MapItinerary } from "./map-itinerary.entity";
import { MapPoint } from "../../parameters/points/entities/map-point.entity";

@Entity('COP087_ITINERARIO_PUNTO')
export class MapItineraryPoint {
    @PrimaryColumn({ type: 'bigint'})
    ITINEPUN_ID: number;

    @Column()
    ITINEPUN_IDITINERARIO: number;

    @ManyToOne(() => MapItinerary, (mapItinerary) => mapItinerary.mapItineraryPoint)
    @JoinColumn({name: 'ITINEPUN_IDITINERARIO'})
    mapItinerary: MapItinerary;

    @Column()
    ITINEPUN_IDPUNTO: number;

    @ManyToOne(() => MapPoint, (mapPoint) => mapPoint.mapItineraryPoint)
    @JoinColumn({name: 'ITINEPUN_IDPUNTO'})
    mapPoint: MapPoint;

    @Column({ type: 'smallint'})
    ITINEPUN_ORDEN: number;

    @Column({ type: 'smallint'})
    ITINEPUN_TIEMPO: number;
}