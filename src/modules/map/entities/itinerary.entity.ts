import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"
import { ItineraryPoint } from "./itinerary-point.entity";

@Entity('COP086_ITINERARIO')
export class Itinerary {
    @PrimaryColumn({ type: 'bigint'})
    ITINE_ID: number;

    @Column({ type: 'nvarchar'})
    ITINE_NOMBRE: string;

    @Column({ type: 'nvarchar'})
    ITINE_ORIGEN: string;

    @Column({ type: 'nvarchar'})
    ITINE_DESTINO: string;

    @OneToMany(() => ItineraryPoint, (itineraryPoint) => itineraryPoint.itinerary)
    itineraryPoint: ItineraryPoint[];
}