import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MapCategoryNovelty } from "../../category-novelty/entities/map-category-novelty.entity";

@Entity('COP046_NOVEDAD_NOVRUTA')
export class MapSubCategoryNovelty {
    @PrimaryGeneratedColumn()
    NOVRUTA_ID: number;

    @Column()
    NOVRUTA_IDTIPO: number;

    @ManyToOne(() => MapCategoryNovelty, (mapCategoryNovelty) => mapCategoryNovelty.mapSubCategoryNovelty)
    @JoinColumn({name: 'NOVRUTA_IDTIPO'})
    mapCategoryNovelty: MapCategoryNovelty;

    @Column({ type: 'char'})
    NOVRUTA_DESCRIPCION: string;

    @Column({ type: 'char'})
    NOVRUTA_STATUS?: string;

    @Column({ type: 'datetime'})
    NOVRUTA_INSERT_DATE?: string;

    @Column({ type: 'datetime'})
    NOVRUTA_UPDATE_DATE?: string;
}