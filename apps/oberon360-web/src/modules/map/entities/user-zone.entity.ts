import { OcUser } from "apps/oberon360-api/src/modules/user/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"

@Entity('SEC024USER_ZONES')
export class OcUserZone {
    @PrimaryColumn({ type: 'bigint'})
    SUZ_ID_REG: number;

    @Column({ type: 'nvarchar'})
    SUZ_DESCRIPTION: string;

    @Column({ type: 'nvarchar'})
    SUZ_LIMIT_LATITUD_SUR: string;

    @Column({ type: 'nvarchar'})
    SUZ_LIMIT_LATITUD_NORTE: string;

    @Column({ type: 'nvarchar'})
    SUZ_LIMIT_LONGITUD_ESTE: string;

    @Column({ type: 'nvarchar'})
    SUZ_LIMIT_LONGITUD_OESTE: string;

    @OneToMany(() => OcUser, (ocUser) => ocUser.ocUserZone)
    ocUser: OcUser[];
}