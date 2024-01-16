import { BelongsTo, BelongsToMany, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import ClientModel from "./client.model";
import ProductModel from "./product.model";
import OrderProductModel from "./orderProduct.model";

@Table({ tableName: "orders", timestamps: false })
export default class OrderModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    id: string;

    @BelongsTo(() => ClientModel)
    client: ClientModel;

    @ForeignKey(() => ClientModel)
    @Column({ allowNull: false })
    clientId: string;

    @BelongsToMany(() => ProductModel, { through: { model: () => OrderProductModel }, foreignKey: "orderId" })
    products: ProductModel[];

    @Column({ allowNull: false })
    status: string;

    @Column({ allowNull: false })
    createdAt: Date;

    @Column({ allowNull: false })
    updatedAt: Date;
}
