import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MapClient } from "./map-client.entity";
import { MapSubCategoryNovelty } from "../../sub-category-novelty/entities/map-sub-category-novelty.entity";

@Entity('COP045_TIPO_NOVRUTA')
export class MapCategoryNovelty {
    @PrimaryGeneratedColumn()
    TIPRUTA_ID: number;

    @Column()
    TIPRUTA_CLIENTEID: string;

    @ManyToOne(() => MapClient, (mapClient) => mapClient.mapCategoryNovelty)
    @JoinColumn({name: 'TIPRUTA_CLIENTEID'})
    mapClient: MapClient;

    @Column({ type: 'char'})
    TIPRUTA_DESCRIPCION: string;

    @Column({ type: 'char'})
    TIPRUTA_STATUS: string;

    @OneToMany(() => MapSubCategoryNovelty, (mapSubCategoryNovelty) => mapSubCategoryNovelty.mapCategoryNovelty)
    mapSubCategoryNovelty: MapSubCategoryNovelty[];
}