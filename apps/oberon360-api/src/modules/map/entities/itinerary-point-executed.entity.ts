import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { Point } from "./point.entity";
import { StateIpe } from "./state-ipe.entity";

@Entity('COP091_ITINERARIO_PUNTOS_EJECUTADO')
export class ItineraryPointExecuted {
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

    @ManyToOne(() => Point, (point) => point.itineraryPointExecuted)
    @JoinColumn({name: 'IPE_IDPUNTO'})
    point: Point;

    @Column({ type: 'datetime'})
    IPE_FECHA_PRESUPUESTADO: string;

    @Column()
    IPE_ESTADO: number;

    @ManyToOne(() => StateIpe, (stateIpe) => stateIpe.itineraryPointExecuted)
    @JoinColumn({name: 'IPE_ESTADO'})
    state: StateIpe;
}