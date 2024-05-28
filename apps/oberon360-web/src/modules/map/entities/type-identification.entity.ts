import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"
import { Driver } from "../../driver/entities/driver.entity";

@Entity('OPE004_TIPO_IDENTIFICACION')
export class TypeIdentification {
    @PrimaryColumn({ type: 'char'})
    TIP_IDEN_ID: string;

    @Column({ type: 'nvarchar'})
    TIP_IDEN_DESCRIPCION: string;

    @OneToMany(() => Driver, (driver) => driver.typeIdentification)
    driver: Driver[];
}