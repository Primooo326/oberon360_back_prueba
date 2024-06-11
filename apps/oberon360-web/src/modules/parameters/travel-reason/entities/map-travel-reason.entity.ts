import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('CAT062VIATICOS_MOTIVO')
export class MapTravelReason {
    @PrimaryGeneratedColumn()
    VIATIMOT_ID: number;

    @Column({ type: 'nvarchar'})
    VIATIMOT_DESCRIPCION: string;

    @Column({ type: 'char'})
    VIATIMOT_REQUIEREFOTO: string;

    @Column({ type: 'char'})
    VIATIMOT_STATUS: string;

    @Column({ type: 'datetime'})
    VIATIMOT_INSERT_DATE?: string;

    @Column({ type: 'datetime'})
    VIATIMOT_UPDATE_DATE?: string;
}