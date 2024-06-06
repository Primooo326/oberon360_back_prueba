import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { CopDocument } from "./cop-document.entity";
import { CopInventoryTree } from "./cop-inventory-tree.entity";

@Entity('NEG002DOCUMENTO_SERVICIOS')
export class CopDocumentService {
    @PrimaryColumn({ type: 'bigint'})
    DOCSER_ID_REG: number;

    @Column()
    DOCSER_ID_DOCUMENTO: number;

    @ManyToOne(() => CopDocument, (copDocument) => copDocument.copDocumentService)
    @JoinColumn({name: 'DOCSER_ID_DOCUMENTO'})
    copDocument: CopDocument;

    @Column()
    DOCSER_COD_SERV_ID_REG: number;

    @ManyToOne(() => CopInventoryTree, (copInventoryTree) => copInventoryTree.copDocumentService)
    @JoinColumn({name: 'DOCSER_COD_SERV_ID_REG'})
    copInventoryTree: CopInventoryTree;

    @Column({ type: 'bigint'})
    DOCSER_MODALIDAD_ID: number;

    @Column({ type: 'bigint'})
    DOCSER_MODALIDAD_ID_NOM: number;

    @Column({ type: 'smallint'})
    DOCSER_MOTIVO_DIF: string;

    @Column({ type: 'nvarchar'})
    DOCSER_DESCRIPCION: string;

    @Column({ type: 'smallint'})
    DOCSER_CANTIDAD: number;

    @Column({ type: 'numeric'})
    DOCSER_VALORUNIT: number;

    @Column({ type: 'numeric'})
    DOCSER_VALORBRUTO: number;

    @Column({ type: 'numeric'})
    DOCSER_VALOR_A_S: number;

    @Column({ type: 'numeric'})
    DOCSER_VALOR_ANT_IVA: number;

    @Column({ type: 'numeric'})
    DOCSER_VALOR_IVA: number;

    @Column({ type: 'numeric'})
    DOCSER_VALOR_TOTAL: number;

    @Column({ type: 'numeric'})
    DOCSER_PORCE_DCTO: number;

    @Column({ type: 'numeric'})
    DOCSER_COMISION: number;

    @Column({ type: 'nvarchar'})
    DOCSER_TIPO_NV2: string;

    @Column({ type: 'bigint'})
    DOCSER_UBICACION: number;

    @Column({ type: 'char'})
    DOCSER_FACTURA_VIATICOS: string;

    @Column({ type: 'nvarchar'})
    DOCSER_PAQUETE: string;

    @Column({ type: 'nvarchar'})
    DOCSER_NOMPAQUETECLI: string;

    @Column({ type: 'char'})
    DOCSER_PAQ_TIPO: string;

    @Column({ type: 'numeric'})
    DOCSER_PAQ_VALOR: number;

    @Column({ type: 'numeric'})
    DOCSER_PAQ_VALORNEW: number;

    @Column({ type: 'numeric'})
    DOCSER_PAQ_PORCENTAJE: number;

    @Column({ type: 'numeric'})
    DOCSER_HORAS_DIURNAS: number;

    @Column({ type: 'numeric'})
    DOCSER_HORAS_NOCTURNAS: number;

    @Column({ type: 'numeric'})
    DOCSER_HORAS_SERVICIO: number;

    @Column({ type: 'char'})
    DOCSER_JORNADA: string;

    @Column({ type: 'nvarchar'})
    DOCSER_CIUDADID: string;

    @Column({ type: 'numeric'})
    DOCSER_COBERTURA_PROMEDIO_ID: number;

    @Column({ type: 'numeric'})
    DOCSER_HORAS_DIURNASFSEM: number;

    @Column({ type: 'numeric'})
    DOCSER_HORAS_NOCTURNASFSEM: number;

    @Column({ type: 'numeric'})
    DOCSER_HORAS_SERVICIOFSEM: number;

    @Column({ type: 'char'})
    DOCSER_JORNADAFSEM: string;

    @Column({ type: 'numeric'})
    DOCSER_COBERTURA_PROMEDIO_IDFSEM: number;

    @Column({ type: 'nvarchar'})
    DOCSER_CARGOID: string;

    @Column({ type: 'numeric'})
    DOCSER_A_S: number;

    @Column({ type: 'numeric'})
    DOCSER_TIPO_MODALIDAD_ID: number;

    @Column({ type: 'nvarchar'})
    DOCSER_NOM_PUESTO: string;

    @Column({ type: 'char'})
    DOCSER_GENERO: string;

    @Column({ type: 'smallint'})
    DOCSER_NODIAS: number;

    @Column({ type: 'smallint'})
    DOCSER_TIPO_DOTACION_ID: number;

    @Column({ type: 'bigint'})
    DOCSER_PROGRAMACION_ID: number;

    @Column({ type: 'char'})
    DOCSER_VLRAGREGADO: string;

    @Column({ type: 'char'})
    DOCSER_SEGVIDA: string;

    @Column({ type: 'char'})
    DOCSER_STATUS: string;

    @Column({ type: 'datetime'})
    DOCSER_INSERT_DATE: string;

    @Column({ type: 'nvarchar'})
    DOCSER_INSERT_WINUSR: string;

    @Column({ type: 'nvarchar'})
    DOCSER_INSERT_MACHINE: string;

    @Column({ type: 'nvarchar'})
    DOCSER_INSERT_MAC: string;

    @Column({ type: 'nvarchar'})
    DOCSER_INSERT_IP: string;

    @Column({ type: 'bigint'})
    DOCSER_INSERT_SESSION_ID: number;

    @Column({ type: 'bigint'})
    DOCSER_INSERT_USER_ID: number;

    @Column({ type: 'datetime'})
    DOCSER_UPDATE_DATE: string;

    @Column({ type: 'nvarchar'})
    DOCSER_UPDATE_WINUSR: string;

    @Column({ type: 'nvarchar'})
    DOCSER_UPDATE_MACHINE: string;

    @Column({ type: 'nvarchar'})
    DOCSER_UPDATE_MAC: string;

    @Column({ type: 'nvarchar'})
    DOCSER_UPDATE_IP: string;

    @Column({ type: 'bigint'})
    DOCSER_UPDATE_SESSION_ID: number;

    @Column({ type: 'bigint'})
    DOCSER_UPDATE_USER_ID: number;

    @Column({ type: 'char'})
    DOCSER_ASIGNACION_PUESTOS: string;
}