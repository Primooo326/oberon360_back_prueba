import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"
import { MapItineraryPointExecuted } from "./map-itinerary-point-executed.entity";

@Entity('COP096_ESTADO_IPE')
export class MapStateIpe {
    @PrimaryColumn({ type: 'smallint'})
    ESTADOIPE_ID: number;

    @Column({ type: 'smallint'})
    ESTADOIPE_ORDEN: string;

    @Column({ type: 'nvarchar'})
    ESTADOIPE_NOMBRE: number;

    @OneToMany(() => MapItineraryPointExecuted, (mapItineraryPointExecuted) => mapItineraryPointExecuted.mapStateIpe)
    mapItineraryPointExecuted: MapItineraryPointExecuted[];
}