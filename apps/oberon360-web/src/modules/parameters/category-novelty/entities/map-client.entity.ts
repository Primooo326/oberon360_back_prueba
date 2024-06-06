import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"
import { MapCategoryNovelty } from "./map-category-novelty.entity";

@Entity('CLI001CLIENTE')
export class MapClient {
    @PrimaryColumn({ type: 'nvarchar'})
    CLIE_ID_REG: string;

    @Column({ type: 'nvarchar'})
    CLIE_ID_REGENTIFICACION: string;

    @Column({ type: 'nvarchar'})
    CLIE_TIPOID: number;

    @Column({ type: 'nvarchar'})
    CLIE_SIGLA: string;

    @Column({ type: 'nvarchar'})
    CLIE_NOMBRE: string;

    @Column({ type: 'nvarchar'})
    CLIE_COMERCIAL: string;

    @Column({ type: 'nvarchar'})
    CLIE_CENTCOS: string;

    @Column({ type: 'bigint'})
    CLIE_USER_FACTURISTA: number;

    @Column({ type: 'nvarchar'})
    CLIE_CRENTABILIDAD: string;

    @Column({ type: 'nvarchar'})
    CLIE_PERIODICIDAD_INC: string;

    @Column({ type: 'char'})
    CLIE_STATUS: string;

    @OneToMany(() => MapCategoryNovelty, (mapCategoryNovelty) => mapCategoryNovelty.mapClient)
    mapCategoryNovelty: MapCategoryNovelty[];
}