import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Protocol } from "./protocol.entity";

@Entity('COP026_PREGUNTA_FUNCION')
export class QuestionFunction {
    @PrimaryGeneratedColumn()
    PREFUN_ID: string;

    @Column({ type: 'nvarchar'})
    PREFUN_PREGUNTA: string;

    @OneToMany(() => Protocol, (protocol) => protocol.questionFunction)
    protocol: Protocol[];
}