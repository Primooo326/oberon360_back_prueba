import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { TypeIdentification } from "../../map/entities/type-identification.entity";
import { FactorRh } from "../../map/entities/factor-rh.entity";

@Entity('COP043_CONDUCTOR')
export class Driver {
    @PrimaryColumn({ type: 'bigint'})
    CONDUCTOR_ID: string;

    @Column()
    CONDUCTOR_ID_TIPOIDENTIFICACION: string;

    @ManyToOne(() => TypeIdentification, (typeIdentification) => typeIdentification.driver)
    @JoinColumn({name: 'CONDUCTOR_ID_TIPOIDENTIFICACION'})
    typeIdentification: TypeIdentification;

    @Column({ type: 'nvarchar'})
    CONDUCTOR_IDENTIFICACION: string;

    @Column({ type: 'nvarchar'})
    CONDUCTOR_CODCONDUCTOR: string;

    @Column({ type: 'nvarchar'})
    CONDUCTOR_PRIMERNOMBRE: string;

    @Column({ type: 'nvarchar'})
    CONDUCTOR_SEGUNDONOMBRE: string;

    @Column({ type: 'nvarchar'})
    CONDUCTOR_PRIMERAPELLIDO: string;

    @Column({ type: 'nvarchar'})
    CONDUCTOR_SEGUNDOAPELLIDO: string;

    @Column()
    CONDUCTOR_ID_RH: number;

    @ManyToOne(() => FactorRh, (factorRh) => factorRh.driver)
    @JoinColumn({name: 'CONDUCTOR_ID_RH'})
    factorRh: FactorRh;

    @Column({ type: 'nvarchar'})
    CONDUCTOR_TELPERSONAL: string;

    @Column({ type: 'nvarchar'})
    CONDUCTOR_TELCORPORATIVO: string;

    @Column({ type: 'nvarchar'})
    CONDUCTOR_CORREO: string;

    @Column({ type: 'varbinary'})
    CONDUCTOR_FOTO: string | any;

    @Column({ type: 'char'})
    CONDUCTOR_ESTADO: string;

    @Column({ type: 'datetime'})
    CONDUCTOR_FECINGRESO: string;
}