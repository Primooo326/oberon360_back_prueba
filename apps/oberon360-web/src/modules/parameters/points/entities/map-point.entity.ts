import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm"
import { MapItineraryPoint } from "../../../map/entities/map-itinerary-point.entity";
import { MapItineraryPointExecuted } from "../../../map/entities/map-itinerary-point-executed.entity";
import { MapTypePoint } from "./map-type-point.entity";
import { MapFleetPoints } from "./map-fleet-point.entity";

@Entity('COP089_PUNTOS')
export class MapPoint {
    @PrimaryColumn({ type: 'bigint'})
    PUN_ID: number;

    @Column({ type: 'nvarchar'})
    PUN_NOMBRE: string;

    @Column()
    PUN_TIPO: number;

    @ManyToOne(() => MapTypePoint, (mapTypePoint) => mapTypePoint.mapPoint)
    @JoinColumn({name: 'PUN_TIPO'})
    mapTypePoint: MapTypePoint;

    @Column({ type: 'nvarchar'})
    PUN_LATITUD: string;

    @Column({ type: 'nvarchar'})
    PUN_LONGITUD: string;

    @Column({ type: 'char'})
    PUN_STATUS: string;

    @Column({ type: 'datetime'})
    PUN_INSERT_DATE?: string;

    @Column({ type: 'datetime'})
    PUN_UPDATE_DATE?: string;

    @Column({ type: 'smallint'})
    PUN_VALOR_PRESUPUESTADO_LECHE: number;

    @Column({ type: 'char'})
    PUN_CHECK_ITINERARIO: string;

    @Column({ type: 'nvarchar'})
    PUN_TELEFONO: string;

    @Column({ type: 'nvarchar'})
    PUN_CENTPROCESO: string;

    @OneToMany(() => MapItineraryPoint, (mapItineraryPoint) => mapItineraryPoint.mapPoint)
    mapItineraryPoint: MapItineraryPoint[];

    @OneToMany(() => MapItineraryPointExecuted, (mapItineraryPointExecuted) => mapItineraryPointExecuted.mapPoint)
    mapItineraryPointExecuted: MapItineraryPointExecuted[];

    @OneToMany(() => MapFleetPoints, (mapFleetPoints) => mapFleetPoints.mapPoint)
    mapFleetPoints: MapFleetPoints[];
}