import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity('Z_PROTOCOLOS_DVEX')
export class ZProtocolo {
    @PrimaryColumn({ type: 'varchar'})
    PRODVEX_NAME: string;

    @Column({ type: 'datetime'})
    PRODVEX_FECHA: string;

    @Column({ type: 'varchar'})
    PRODVEX_ESTADO_PROTOCOLO: string;

    @Column({ type: 'varchar'})
    PRODVEX_BITACORA: string;
}