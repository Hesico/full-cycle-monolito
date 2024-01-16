import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";

@Table({ tableName: "invoiceItems", timestamps: false })
export default class InvoiceItemModel extends Model {
    @PrimaryKey
    @Column
    id: string;

    @Column({ allowNull: false })
    name: string;

    @Column({ allowNull: false })
    price: number;

    @ForeignKey(() => InvoiceModel)
    @Column({ allowNull: false })
    declare invoiceId: string;
}
