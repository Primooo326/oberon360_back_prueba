import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MapPreoperationalSubcategory } from "../../preoperational-subcategory/entities/map-preoperational-subcategory.entity";

@Entity('CAT100CATPREOPERACION')
export class MapPreoperationalCategory {
    @PrimaryGeneratedColumn()
    CATPREOP_ID: number;

    @Column({ type: 'nvarchar'})
    CATPREOP_DESCRIPCION: string;

    @Column({ type: 'smallint'})
    CATPREOP_ORDEN: number;

    @Column({ type: 'char'})
    CATPREOP_ESTADO: string;

    @Column({ type: 'datetime'})
    CATPREOP_INSERT_DATE?: string;

    @Column({ type: 'datetime'})
    CATPREOP_UPDATE_DATE?: string;

    @OneToMany(() => MapPreoperationalSubcategory, (mapPreoperationalSubcategory) => mapPreoperationalSubcategory.mapPreoperationalCategory)
    mapPreoperationalSubcategory: MapPreoperationalSubcategory[];
}