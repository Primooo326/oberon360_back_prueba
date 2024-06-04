import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TypeFunction } from "./type-functions.entity";
import { QuestionFunction } from "./question-function.entity";

@Entity('COP003_FUNCIONES')
export class Protocol {
    @PrimaryGeneratedColumn({ type: 'numeric'})
    FUN_ID: number;

    @Column({ type: 'nvarchar'})
    FUN_CARGOID: string;

    @Column()
    FUN_TIPOFUNID: string;

    @ManyToOne(() => TypeFunction, (typeFunction) => typeFunction.protocol)
    @JoinColumn({name: 'FUN_TIPOFUNID'})
    typeFunction: TypeFunction;

    @Column()
    FUN_PREG_ID: string;

    @ManyToOne(() => QuestionFunction, (questionFunction) => questionFunction.protocol)
    @JoinColumn({name: 'FUN_PREG_ID'})
    questionFunction: QuestionFunction;

    @Column({ type: 'nvarchar'})
    FUN_FUNCION: string;
}