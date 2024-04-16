import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"
import { ItineraryPoint } from "./itinerary-point.entity";
import { ItineraryPointExecuted } from "./itinerary-point-executed.entity";

@Entity('COP089_PUNTOS')
export class Point {
    @PrimaryColumn({ type: 'bigint'})
    PUN_ID: number;

    @Column({ type: 'nvarchar'})
    PUN_NOMBRE: string;

    @Column({ type: 'nvarchar'})
    PUN_LATITUD: string;

    @Column({ type: 'nvarchar'})
    PUN_LONGITUD: string;

    @OneToMany(() => ItineraryPoint, (itineraryPoint) => itineraryPoint.point)
    itineraryPoint: ItineraryPoint[];

    @OneToMany(() => ItineraryPointExecuted, (itineraryPointExecuted) => itineraryPointExecuted.point)
    itineraryPointExecuted: ItineraryPointExecuted[];
}