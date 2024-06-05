import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Protocol } from "./protocol.entity";

@Entity('COP026_PREGUNTA_FUNCION')
export class QuestionFunction {
    @PrimaryColumn({ type: 'nvarchar', length: 20 })
    PREFUN_ID: string;

    @Column({ type: 'nvarchar'})
    PREFUN_PREGUNTA: string;

    @OneToMany(() => Protocol, (protocol) => protocol.questionFunction)
    protocol: Protocol[];
}