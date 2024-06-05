import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TypeFunction } from "./type-functions.entity";
import { QuestionFunction } from "./question-function.entity";

@Entity('COP003_FUNCIONES')
export class Protocol {
    @PrimaryGeneratedColumn()
    FUN_ID: number;

    @Column({ type: 'nvarchar', length: 20, nullable: true })
    FUN_CARGOID: string | null;

    @Column({ type: 'nvarchar', length: 20, nullable: false })
    FUN_TIPOFUNID: string;

    @ManyToOne(() => TypeFunction, (typeFunction) => typeFunction.protocol, { nullable: true })
    @JoinColumn({ name: 'FUN_TIPOFUNID' })
    typeFunction: TypeFunction;

    @Column({ type: 'nvarchar', length: 20, nullable: false })
    FUN_PREG_ID: string;

    @ManyToOne(() => QuestionFunction, (questionFunction) => questionFunction.protocol, { nullable: true })
    @JoinColumn({ name: 'FUN_PREG_ID' })
    questionFunction: QuestionFunction;

    @Column({ type: 'nvarchar', nullable: false })
    FUN_FUNCION: string;

    @Column({ type: 'char', default: '1', nullable: false })
    FUN_STATUS: string;
}