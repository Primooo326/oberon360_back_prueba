import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"
import { MapDriver } from "../../parameters/driver/entities/driver.entity";

@Entity('CAT093FACTOR_RH')
export class MapFactorRh {
    @PrimaryColumn({ type: 'smallint'})
    FACTOR_RH_ID_REG: number;

    @Column({ type: 'nvarchar'})
    FACTOR_RH_CODIGO: string;

    @Column({ type: 'nvarchar'})
    FACTOR_RH_DESCRIPCION: string;

    @Column({ type: 'nvarchar'})
    FACTOR_RH_SIGLA: string;

    @OneToMany(() => MapDriver, (mapDriver) => mapDriver.mapFactorRh)
    mapDriver: MapDriver[];
}