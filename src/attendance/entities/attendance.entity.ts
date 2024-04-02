import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('COP023_ASISTENCIA')
export class Attendance {
    @PrimaryColumn({ type: 'numeric'})
    ASISTENCIA_ID: number;

    @Column({ type: 'nvarchar'})
    ASISTENCIA_EMPLEADOID: string;

    @Column({ type: 'varbinary'})
    ASISTENCIA_FOTO: string;

    @Column({ type: 'date'})
    ASISTENCIA_FECHA: string;

    @Column({ type: 'time'})
    ASISTENCIA_HORA: string;

    @Column({ type: 'numeric'})
    ASISTENCIA_ENOJADO: number;

    @Column({ type: 'numeric'})
    ASISTENCIA_ARROGANCIA: number;

    @Column({ type: 'numeric'})
    ASISTENCIA_DESAGRADO: number;

    @Column({ type: 'numeric'})
    ASISTENCIA_MIEDO: number;

    @Column({ type: 'numeric'})
    ASISTENCIA_FELICIDAD: number;

    @Column({ type: 'numeric'})
    ASISTENCIA_NEUTRAL: number;

    @Column({ type: 'numeric'})
    ASISTENCIA_TRISTEZA: number;

    @Column({ type: 'numeric'})
    ASISTENCIA_SORPREND: number;

    @Column({ type: 'nvarchar'})
    ASISTENCIA_LAT: string;

    @Column({ type: 'nvarchar'})
    ASISTENCIA_LON: string;

    @Column({ type: 'varbinary'})
    ASISTENCIA_FOTOC: string;

    @Column({ type: 'date'})
    ASISTENCIA_FECHAC: string;

    @Column({ type: 'time'})
    ASISTENCIA_HORAC: string;

    @Column({ type: 'numeric'})
    ASISTENCIA_ENOJADOC: number;

    @Column({ type: 'numeric'})
    ASISTENCIA_ARROGANCIAC: number;

    @Column({ type: 'numeric'})
    ASISTENCIA_DESAGRADOC: number;

    @Column({ type: 'numeric'})
    ASISTENCIA_MIEDOC: number;

    @Column({ type: 'numeric'})
    ASISTENCIA_FELICIDADC: number;

    @Column({ type: 'numeric'})
    ASISTENCIA_NEUTRALC: number;

    @Column({ type: 'numeric'})
    ASISTENCIA_TRISTEZAC: number;

    @Column({ type: 'numeric'})
    ASISTENCIA_SORPRENDC: number;

    @Column({ type: 'char'})
    ASISTENCIA_CIERRE: string;

    @Column({ type: 'numeric'})
    ASISTENCIA_IDPUESTO: number;

    @Column({ type: 'nvarchar'})
    ASISTENCIA_CARGOID: string;

    @Column({ type: 'char'})
    ASISTENCIA_ESTADO: string;

    @Column({ type: 'datetime'})
    ASISTENCIA_INSERT_DATE: string;

    @Column({ type: 'nvarchar'})
    ASISTENCIA_INSERT_WINUSR: string;

    @Column({ type: 'nvarchar'})
    ASISTENCIA_INSERT_MACHINE: string;

    @Column({ type: 'nvarchar'})
    ASISTENCIA_INSERT_MAC: string;

    @Column({ type: 'nvarchar'})
    ASISTENCIA_INSERT_IP: string;

    @Column({ type: 'bigint'})
    ASISTENCIA_INSERT_SESSION_ID: number;

    @Column({ type: 'bigint'})
    ASISTENCIA_INSERT_USER_ID: number;

    @Column({ type: 'datetime'})
    ASISTENCIA_UPDATE_DATE: string;

    @Column({ type: 'nvarchar'})
    ASISTENCIA_UPDATE_WINUSR: string;

    @Column({ type: 'nvarchar'})
    ASISTENCIA_UPDATE_MACHINE: string;

    @Column({ type: 'nvarchar'})
    ASISTENCIA_UPDATE_MAC: string;

    @Column({ type: 'nvarchar'})
    ASISTENCIA_UPDATE_IP: string;

    @Column({ type: 'bigint'})
    ASISTENCIA_UPDATE_SESSION_ID: number;

    @Column({ type: 'bigint'})
    ASISTENCIA_UPDATE_USER_ID: number;

    @Column({ type: 'numeric'})
    ASISTENCIA_RN: number;

    @Column({ type: 'numeric'})
    ASISTENCIA_HED: number;

    @Column({ type: 'numeric'})
    ASISTENCIA_HEN: number;

    @Column({ type: 'numeric'})
    ASISTENCIA_RNF: number;

    @Column({ type: 'numeric'})
    ASISTENCIA_HDF: number;

    @Column({ type: 'numeric'})
    ASISTENCIA_HEDF: number;

    @Column({ type: 'numeric'})
    ASISTENCIA_HENF: number;
}
