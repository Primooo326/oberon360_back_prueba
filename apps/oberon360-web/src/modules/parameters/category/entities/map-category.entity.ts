import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MapClient } from "./map-client.entity";
import { MapSubCategory } from "../../sub-category/entities/map-sub-category.entity";

@Entity('COP045_TIPO_NOVRUTA')
export class MapCategory {
    @PrimaryGeneratedColumn()
    TIPRUTA_ID: number;

    @Column()
    TIPRUTA_CLIENTEID: string;

    @ManyToOne(() => MapClient, (mapClient) => mapClient.mapCategory)
    @JoinColumn({name: 'TIPRUTA_CLIENTEID'})
    mapClient: MapClient;

    @Column({ type: 'char'})
    TIPRUTA_DESCRIPCION: string;

    @Column({ type: 'char'})
    TIPRUTA_STATUS: string;

    @OneToMany(() => MapSubCategory, (mapSubCategory) => mapSubCategory.mapCategory)
    mapSubCategory: MapSubCategory[];
}