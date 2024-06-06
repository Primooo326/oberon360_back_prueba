import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { CopClient } from "./cop-client.entity";
import { CopDocumentService } from "./cop-document-service.entiy";

@Entity('NEG001DOCUMENTO')
export class CopDocument{
    @PrimaryColumn({ type: 'bigint'})
    NEGDOC_ID_REG: string;

    @Column()
    NEGDOC_ID_CLIENTE: number;

    @ManyToOne(() => CopClient, (copClient) => copClient.copDocument)
    @JoinColumn({name: 'NEGDOC_ID_CLIENTE'})
    copClient: CopClient;

    @Column({ type: 'nvarchar'})
    NEGDOC_PREFIJO_CONSECUT: string;

    @Column({ type: 'nvarchar'})
    NEGDOC_CODIGO: string;

    @Column({ type: 'nvarchar'})
    NEGDOC_CODPUBLICO: string;

    @Column({ type: 'nvarchar'})
    NEGDOC_COMENTARIO: string;

    @Column({ type: 'date'})
    NEGDOC_FECHA: string;

    @Column({ type: 'datetime'})
    NEGDOC_FECHA_ELABORA: string;

    @Column({ type: 'datetime'})
    NEGDOC_FECHA_GENERADO: string;

    @Column({ type: 'smallint'})
    NEGDOC_PLAZO: string;

    @Column({ type: 'nvarchar'})
    NEGDOC_LISTAP: string;

    @Column({ type: 'smallint'})
    NEGDOC_DURACION: string;

    @Column({ type: 'varchar'})
    NEGDOC_EMAIL: string;

    @Column({ type: 'nvarchar'})
    NEGDOC_COD_INSTRUMENTO_PAGO: string;

    @Column({ type: 'nvarchar'})
    NEGDOC_COD_TIPO_MONEDA: string;

    @Column({ type: 'numeric'})
    NEGDOC_TASA: string;

    @Column({ type: 'bigint'})
    NEGDOC_ID_CONTACTO: string;

    @Column({ type: 'bigint'})
    NEGDOC_ID_ASESOR_COMERCIAL: string;

    @Column({ type: 'date'})
    NEGDOC_FECHA_INICIAL: string;

    @Column({ type: 'date'})
    NEGDOC_FECHA_FINAL: string;

    @Column({ type: 'date'})
    NEGDOC_FECHA_FIRMA: string;

    @Column({ type: 'datetime'})
    NEGDOC_FECHA_ENVIO: string;

    @Column({ type: 'char'})
    NEGDOC_RESPUESTA: string;

    @Column({ type: 'bigint'})
    NEGDOC_ID_CONTACTO_FIRMA: string;

    @Column({ type: 'char'})
    NEGDOC_MANEJAITEMS: string;

    @Column({ type: 'char'})
    NEGDOC_STATUS: string;

    @Column({ type: 'datetime'})
    NEGDOC_INSERT_DATE: string;

    @Column({ type: 'nvarchar'})
    NEGDOC_INSERT_WINUSR: string;

    @Column({ type: 'nvarchar'})
    NEGDOC_INSERT_MACHINE: string;

    @Column({ type: 'nvarchar'})
    NEGDOC_INSERT_MAC: string;

    @Column({ type: 'nvarchar'})
    NEGDOC_INSERT_IP: string;

    @Column({ type: 'bigint'})
    NEGDOC_INSERT_SESSION_ID: number;

    @Column({ type: 'bigint'})
    NEGDOC_INSERT_USER_ID: number;

    @Column({ type: 'datetime'})
    NEGDOC_UPDATE_DATE: string;

    @Column({ type: 'nvarchar'})
    NEGDOC_UPDATE_WINUSR: string;

    @Column({ type: 'nvarchar'})
    NEGDOC_UPDATE_MACHINE: string;

    @Column({ type: 'nvarchar'})
    NEGDOC_UPDATE_MAC: string;

    @Column({ type: 'nvarchar'})
    NEGDOC_UPDATE_IP: string;

    @Column({ type: 'bigint'})
    NEGDOC_UPDATE_SESSION_ID: number;

    @Column({ type: 'bigint'})
    NEGDOC_UPDATE_USER_ID: number;

    @Column({ type: 'nvarchar'})
    NEGDOC_CENTRO_DE_COSTOS: string;

    @OneToMany(() => CopDocumentService, (copDocumentService) => copDocumentService.copDocument)
    copDocumentService: CopDocumentService[];
}