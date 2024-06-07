import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('CAT062VIATICOS_MOTIVO')
export class TravelReason {
    @PrimaryGeneratedColumn()
    VIATIMOT_ID: number;

    @Column({ type: 'nvarchar'})
    VIATIMOT_DESCRIPCION: string;

    @Column({ type: 'char'})
    VIATIMOT_REQUIEREFOTO: string;

    @Column({ type: 'char'})
    VIATIMOT_STATUS: string;
}