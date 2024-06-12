import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MapFleetPoints } from "./map-fleet-point.entity";

@Entity('CAT060TIPOSERVICIO')
export class MapFleet {
    @PrimaryGeneratedColumn()
    TIPOSERVICIO_ID: number;

    @Column({ type: 'nvarchar'})
    TIPOSERVICIO_DESCRIPCION: string;

    @Column({ type: 'nvarchar'})
    TIPOSERVICIO_IMG_NORMAL: string;

    @Column({ type: 'nvarchar'})
    TIPOSERVICIO_IMG_APAGADO: string;

    @Column({ type: 'nvarchar'})
    TIPOSERVICIO_IMG_ALERTADO: string;

    @Column({ type: 'nvarchar'})
    TIPOSERVICIO_IMG_INCOMUNICADO: string;

    @Column({ type: 'nvarchar'})
    TIPOSERVICIO_IMG_TALLER: string;

    @Column({ type: 'nvarchar'})
    TIPOSERVICIO_IMG_PATIOS: string;

    @Column({ type: 'nvarchar'})
    TIPOSERVICIO_IMG_SINIESTRO: string;

    @Column({ type: 'char'})
    TIPOSERVICIO_STATUS: string;

    @OneToMany(() => MapFleetPoints, (mapFleetPoints) => mapFleetPoints.mapFleet)
    mapFleetPoints: MapFleetPoints[];
}