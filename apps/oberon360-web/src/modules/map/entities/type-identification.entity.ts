import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"
import { MapDriver } from "../../parameters/driver/entities/driver.entity";

@Entity('OPE004_TIPO_IDENTIFICACION')
export class MapTypeIdentification {
    @PrimaryColumn({ type: 'char'})
    TIP_IDEN_ID: string;

    @Column({ type: 'nvarchar'})
    TIP_IDEN_DESCRIPCION: string;

    @OneToMany(() => MapDriver, (mapDriver) => mapDriver.mapTypeIdentification)
    mapDriver: MapDriver[];
}