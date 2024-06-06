import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MapCategory } from "../../category/entities/map-category.entity";

@Entity('COP046_NOVEDAD_NOVRUTA')
export class MapSubCategory {
    @PrimaryGeneratedColumn()
    NOVRUTA_ID: number;

    @Column()
    NOVRUTA_IDTIPO: number;

    @ManyToOne(() => MapCategory, (mapCategory) => mapCategory.mapSubCategory)
    @JoinColumn({name: 'NOVRUTA_IDTIPO'})
    mapCategory: MapCategory;

    @Column({ type: 'char'})
    NOVRUTA_DESCRIPCION: string;

    @Column({ type: 'char'})
    NOVRUTA_STATUS: string;
}