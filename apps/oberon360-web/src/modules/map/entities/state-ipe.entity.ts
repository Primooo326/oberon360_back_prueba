import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"
import { ItineraryPointExecuted } from "./itinerary-point-executed.entity";

@Entity('COP096_ESTADO_IPE')
export class StateIpe {
    @PrimaryColumn({ type: 'smallint'})
    ESTADOIPE_ID: number;

    @Column({ type: 'smallint'})
    ESTADOIPE_ORDEN: string;

    @Column({ type: 'nvarchar'})
    ESTADOIPE_NOMBRE: number;

    @OneToMany(() => ItineraryPointExecuted, (itineraryPointExecuted) => itineraryPointExecuted.state)
    itineraryPointExecuted: ItineraryPointExecuted[];
}