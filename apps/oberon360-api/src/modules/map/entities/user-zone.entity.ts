import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"
import { User } from "../../user/entities/user.entity";

@Entity('SEC024USER_ZONES')
export class UserZone {
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

    @OneToMany(() => User, (user) => user.userZone)
    user: User[];
}