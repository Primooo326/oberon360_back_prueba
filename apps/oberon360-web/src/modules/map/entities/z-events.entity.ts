import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity('Z_EVENTOS_DVEX')
export class ZEventos {
    @PrimaryColumn({ type: 'int'})
    CLIPMARK_ID: number;

    @Column({ type: 'nvarchar'})
    CLIPMARK_LABEL: string;

    @Column({ type: 'nvarchar'})
    CLIPMARK_DESCRIPTION: string;

    @Column({ type: 'int'})
    CLIPMARK_MISION_ID: number;

    @Column({ type: 'nvarchar'})
    MISSION_IDENTIFIER: string;

    @Column({ type: 'int'})
    CLIPMARK_CHANNEL_ID: number;

    @Column({ type: 'nvarchar'})
    CHANNEL_NAME: string;

    @Column({ type: 'nvarchar'})
    CLIPMARK_FOLDER_PATH: string;

    @Column({ type: 'nvarchar'})
    CLIPMARK_PREVIEW_PATH: string;

    @Column({ type: 'geography'})
    CLIPMARK_EVENT_LOCATION: string;

    @Column({ type: 'bigint'})
    CLIPMARK_EVENT_START_TIME: boolean;

    @Column({ type: 'bigint'})
    CLIPMARK_EVENT_END_TIME: boolean;

    @Column({ type: 'nvarchar'})
    CLIPMARK_AUTHOR: string;

    @Column({ type: 'nvarchar'})
    CLIPMARK_LONGITUD: string;

    @Column({ type: 'nvarchar'})
    CLIPMARK_LATITUD: string;
}