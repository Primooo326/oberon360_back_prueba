import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"
import { Driver } from "./driver.entity";

@Entity('CAT093FACTOR_RH')
export class FactorRh {
    @PrimaryColumn({ type: 'smallint'})
    FACTOR_RH_ID_REG: number;

    @Column({ type: 'nvarchar'})
    FACTOR_RH_CODIGO: string;

    @Column({ type: 'nvarchar'})
    FACTOR_RH_DESCRIPCION: string;

    @Column({ type: 'nvarchar'})
    FACTOR_RH_SIGLA: string;

    @OneToMany(() => Driver, (driver) => driver.factorRh)
    driver: Driver[];
}