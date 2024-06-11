import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('CAT100CATPREOPERACION')
export class MapPreoperationalCategory {
    @PrimaryGeneratedColumn()
    CATPREOP_ID: string;

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
}