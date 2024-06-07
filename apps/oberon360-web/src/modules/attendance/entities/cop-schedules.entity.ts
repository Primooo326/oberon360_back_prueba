import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('COP101_HORARIOS_ACTUAL')
export class CopSchedules {
    @PrimaryColumn({ name: 'HORA_ID', type: 'numeric' })
    HORA_ID: number;

    @Column({ name: 'HORA_EMPLEADOID', type: 'nvarchar' })
    HORA_EMPLEADOID: string;

    @Column({ name: 'HORA_POSICION', type: 'nvarchar' })
    HORA_POSICION: string;

    @Column({ name: 'HORA_PLAZAID', type: 'bigint' })
    HORA_PLAZAID: number;

    @Column({ name: 'HORA_FECINI', type: 'date' })
    HORA_FECINI: string;

    @Column({ name: 'HORA_FECFIN', type: 'date' })
    HORA_FECFIN: string;

    @Column({ name: 'HORA_HORAINI', type: 'time' })
    HORA_HORAINI: string;

    @Column({ name: 'HORA_HORAFIN', type: 'time' })
    HORA_HORAFIN: string;

    @Column({ name: 'HORA_INCIDENCIA', type: 'char' })
    HORA_INCIDENCIA: string;

    @Column({ name: 'HORA_FECCIERRE', type: 'datetime' })
    HORA_FECCIERRE: string;

    @Column({ name: 'HORA_USUARIO', type: 'varchar' })
    HORA_USUARIO: string;

    @Column({ name: 'HORA_HD', type: 'numeric' })
    HORA_HD: number;

    @Column({ name: 'HORA_RN', type: 'numeric' })
    HORA_RN: number;

    @Column({ name: 'HORA_HDF', type: 'numeric' })
    HORA_HDF: number;

    @Column({ name: 'HORA_RNF', type: 'numeric' })
    HORA_RNF: number;

    @Column({ name: 'HORA_HDE', type: 'numeric' })
    HORA_HDE: number;

    @Column({ name: 'HORA_HNE', type: 'numeric' })
    HORA_HNE: number;

    @Column({ name: 'HORA_HDFE', type: 'numeric' })
    HORA_HDFE: number;

    @Column({ name: 'HORA_HNFE', type: 'numeric' })
    HORA_HNFE: number;

    @Column({ name: 'HORA_PUESTO', type: 'nvarchar' })
    HORA_PUESTO: string;

    @Column({ name: 'HORA_FECHAINIORI', type: 'date' })
    HORA_FECHAINIORI: string;

    @Column({ name: 'HORA_FECHAFINORI', type: 'date' })
    HORA_FECHAFINORI: string;

    @Column({ name: 'HORA_HORAINIORI', type: 'time' })
    HORA_HORAINIORI: string;

    @Column({ name: 'HORA_HORAFINORI', type: 'time' })
    HORA_HORAFINORI: string;

    @Column({ name: 'HORA_CIERRE', type: 'char' })
    HORA_CIERRE: string;

    @Column({ name: 'HORA_OPENPOST', type: 'char' })
    HORA_OPENPOST: string;

    @Column({ name: 'HORA_RELEVA', type: 'nvarchar' })
    HORA_RELEVA: string;

    @Column({ name: 'HORA_RELEVADO', type: 'nvarchar' })
    HORA_RELEVADO: string;

    @Column({ name: 'HORA_IDINCIDENCIA', type: 'bigint' })
    HORA_IDINCIDENCIA: number;

    @Column({ name: 'HORA_FECOPEN', type: 'datetime' })
    HORA_FECOPEN: string;

    @Column({ name: 'HORA_OBSERVACION', type: 'varchar' })
    HORA_OBSERVACION: string;

    @Column({ name: 'HORA_ACUM48', type: 'numeric' })
    HORA_ACUM48: number;

    @Column({ name: 'HORA_HORASBASE', type: 'numeric' })
    HORA_HORASBASE: number;

    @Column({ name: 'HORA_BASELIQ', type: 'numeric' })
    HORA_BASELIQ: number;

    @Column({ name: 'HORA_ESTADO', type: 'char' })
    HORA_ESTADO: string;
}
