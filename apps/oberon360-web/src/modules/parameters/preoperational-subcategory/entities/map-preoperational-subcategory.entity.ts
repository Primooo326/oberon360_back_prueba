import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MapPreoperationalCategory } from "../../preoperational-category/entities/map-preoperational-category.entity";

@Entity('CAT101SUBCATPREOPERACION')
export class MapPreoperationalSubcategory {
    @PrimaryGeneratedColumn()
    SUBCATPREOP_ID: number;

    @Column({ type: 'nvarchar'})
    SUBCATPREOP_DESCRIPCION: string;

    @Column()
    SUBCATPREOP_IDCATEGORIA: number;

    @ManyToOne(() => MapPreoperationalCategory, (mapPreoperationalCategory) => mapPreoperationalCategory.mapPreoperationalSubcategory)
    @JoinColumn({name: 'SUBCATPREOP_IDCATEGORIA'})
    mapPreoperationalCategory: MapPreoperationalCategory;

    @Column({ type: 'char'})
    SUBCATPREOP_ESTADO: string;

    @Column({ type: 'datetime'})
    SUBCATPREOP_INSERT_DATE?: string;

    @Column({ type: 'datetime'})
    SUBCATPREOP_UPDATE_DATE?: string;
}