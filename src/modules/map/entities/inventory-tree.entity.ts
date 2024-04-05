import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { DocumentService } from "./document-service.entiy";

@Entity('CAT037ARBOL_INVENTARIO')
export class InventoryTree{
    @PrimaryColumn({ type: 'nvarchar'})
    ARBOL_INVE_ID_REG: string;

    @Column({ type: 'nvarchar'})
    ARBOL_INVE_CODPADRE: string;

    @Column({ type: 'nvarchar'})
    ARBOL_INVE_CODIGO: string;

    @Column({ type: 'nvarchar'})
    ARBOL_INVE_COD_NIVEL_INV: string;

    @Column({ type: 'nvarchar'})
    ARBOL_INVE_DESCRIPCION: string;

    @Column({ type: 'nvarchar'})
    ARBOL_INVE_SIGLA: string;

    @Column({ type: 'char'})
    ARBOL_INVE_MAN_TIPO_NV2: string;

    @Column({ type: 'char'})
    ARBOL_INVE_STATUS: string;

    @Column({ type: 'char'})
    ARBOL_INVE_PLANEA_PUESTOS: string;

    @Column({ type: 'char'})
    ARBOL_INVE_NA: string;

    @Column({ type: 'datetime'})
    ARBOL_INVE_INSERT_DATE: string;

    @Column({ type: 'nvarchar'})
    ARBOL_INVE_INSERT_WINUSR: string;

    @Column({ type: 'nvarchar'})
    ARBOL_INVE_INSERT_MACHINE: string;

    @Column({ type: 'nvarchar'})
    ARBOL_INVE_INSERT_MAC: string;

    @Column({ type: 'nvarchar'})
    ARBOL_INVE_INSERT_IP: string;

    @Column({ type: 'bigint'})
    ARBOL_INVE_INSERT_SESSION_ID: number;

    @Column({ type: 'bigint'})
    ARBOL_INVE_INSERT_USER_ID: number;

    @Column({ type: 'datetime'})
    ARBOL_INVE_UPDATE_DATE: string;

    @Column({ type: 'nvarchar'})
    ARBOL_INVE_UPDATE_WINUSR: string;

    @Column({ type: 'nvarchar'})
    ARBOL_INVE_UPDATE_MACHINE: string;

    @Column({ type: 'nvarchar'})
    ARBOL_INVE_UPDATE_MAC: string;

    @Column({ type: 'nvarchar'})
    ARBOL_INVE_UPDATE_IP: string;

    @Column({ type: 'bigint'})
    ARBOL_INVE_UPDATE_SESSION_ID: number;

    @Column({ type: 'bigint'})
    ARBOL_INVE_UPDATE_USER_ID: number;

    @Column({ type: 'nvarchar'})
    ARBOL_INVE_SECCION: string;

    @OneToMany(() => DocumentService, (documentService) => documentService.inventoryTree)
    documentService: DocumentService[];
}