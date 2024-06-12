import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MapPoint } from "./map-point.entity";

@Entity('CAT095TIPOPUNTOS')
export class MapTypePoint {
    @PrimaryGeneratedColumn()
    PUNTOS_ID: number;

    @Column({ type: 'nvarchar'})
    PUNTOS_DESCRIPCION: string;

    @Column({ type: 'nvarchar'})
    PUNTOS_NOMIMAGEN: string;

    @Column({ type: 'char'})
    PUNTOS_VEHICULOS: string;

    @Column({ type: 'char'})
    PUNTOS_STATUS: string;

    @OneToMany(() => MapPoint, (mapPoint) => mapPoint.mapTypePoint)
    mapPoint: MapPoint[];
}