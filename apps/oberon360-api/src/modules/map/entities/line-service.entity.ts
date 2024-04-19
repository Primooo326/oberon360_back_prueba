import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { InventoryTree } from "./inventory-tree.entity";

@Entity('NEG054_LINEA_SERVICIOS')
export class LineService {
    @PrimaryColumn({ type: 'bigint'})
    LINSER_ID_REG: string;

    @Column({ type: 'nvarchar'})
    LINSER_NAME: string;

    @OneToMany(() => InventoryTree, (inventoryTree) => inventoryTree.lineService)
    inventoryTree: InventoryTree[];
}