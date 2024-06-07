import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { MapPoint } from "./map-point.entity";
import { MapStateIpe } from "./map-state-ipe.entity";

@Entity('COP091_ITINERARIO_PUNTOS_EJECUTADO')
export class MapItineraryPointExecuted {
    @PrimaryColumn({ type: 'bigint'})
    IPE_ID: number;

    @Column({ type: 'bigint'})
    IPE_IDASIGNACION: number;

    @Column({ type: 'smallint'})
    IPE_ORDEN: number;

    @Column({ type: 'smallint'})
    IPE_TIEMPO: number;

    @Column({ type: 'datetime'})
    IPE_FECHA_LLEGADA: string;

    @Column()
    IPE_IDPUNTO: number;

    @ManyToOne(() => MapPoint, (mapPoint) => mapPoint.mapItineraryPointExecuted)
    @JoinColumn({name: 'IPE_IDPUNTO'})
    mapPoint: MapPoint;

    @Column({ type: 'datetime'})
    IPE_FECHA_PRESUPUESTADO: string;

    @Column()
    IPE_ESTADO: number;

    @ManyToOne(() => MapStateIpe, (mapStateIpe) => mapStateIpe.mapItineraryPointExecuted)
    @JoinColumn({name: 'IPE_ESTADO'})
    mapStateIpe: MapStateIpe;
}