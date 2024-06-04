import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Protocol } from "./protocol.entity";

@Entity('COP004_TIPO_FUNCIONES')
export class TypeFunction {
    @PrimaryGeneratedColumn()
    TFUN_ID: string;

    @Column({ type: 'nvarchar'})
    TFUN_NOMBRE: string;

    @Column({ type: 'char'})
    TFUN_ORDEN: string;

    @OneToMany(() => Protocol, (protocol) => protocol.typeFunction)
    protocol: Protocol[];
}