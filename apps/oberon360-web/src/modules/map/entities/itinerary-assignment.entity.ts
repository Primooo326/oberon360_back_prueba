import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity('COP085_ASISGNACION_ITINERARIO')
export class ItineraryAssignment {
    @PrimaryColumn({ type: 'bigint'})
    ITNE_ID: number;

    @Column({ type: 'smallint'})
    ITNE_IDTIPOVIAJE: number;

    @Column({ type: 'bigint'})
    ITNE_IDCONDUCTOR: number;

    @Column({ type: 'smallint'})
    ITNE_IDVEHICULO: number;

    @Column({ type: 'smallint'})
    ITNE_IDREMOLQUE: number;

    @Column({ type: 'bigint'})
    ITNE_IDITINERARIO: number;
}