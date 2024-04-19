import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { Itinerary } from "./itinerary.entity";
import { Point } from "./point.entity";

@Entity('COP087_ITINERARIO_PUNTO')
export class ItineraryPoint {
    @PrimaryColumn({ type: 'bigint'})
    ITINEPUN_ID: number;

    @Column()
    ITINEPUN_IDITINERARIO: number;

    @ManyToOne(() => Itinerary, (itinerary) => itinerary.itineraryPoint)
    @JoinColumn({name: 'ITINEPUN_IDITINERARIO'})
    itinerary: Itinerary;

    @Column()
    ITINEPUN_IDPUNTO: number;

    @ManyToOne(() => Point, (point) => point.itineraryPoint)
    @JoinColumn({name: 'ITINEPUN_IDPUNTO'})
    point: Point;

    @Column({ type: 'smallint'})
    ITINEPUN_ORDEN: number;

    @Column({ type: 'smallint'})
    ITINEPUN_TIEMPO: number;
}