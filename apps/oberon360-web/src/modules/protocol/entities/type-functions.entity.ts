import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Protocol } from "./protocol.entity";

@Entity('COP004_TIPO_FUNCIONES')
export class TypeFunction {
    @PrimaryColumn({ type: 'nvarchar', length: 20 })
    TFUN_ID: string;

    @Column({ type: 'nvarchar'})
    TFUN_NOMBRE: string;

    @Column({ type: 'char'})
    TFUN_ORDEN: string;

    @Column({ type: 'char'})
    TFUN_STATUS: string;

    @OneToMany(() => Protocol, (protocol) => protocol.typeFunction)
    protocol: Protocol[];
}