import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { CopInventoryTree } from "./cop-inventory-tree.entity";

@Entity('NEG054_LINEA_SERVICIOS')
export class CopLineService {
    @PrimaryColumn({ type: 'bigint'})
    LINSER_ID_REG: string;

    @Column({ type: 'nvarchar'})
    LINSER_NAME: string;

    @OneToMany(() => CopInventoryTree, (copInventoryTree) => copInventoryTree.copLineService)
    copInventoryTree: CopInventoryTree[];
}