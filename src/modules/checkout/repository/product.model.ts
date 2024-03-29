import { BelongsToMany, Column, Model, PrimaryKey, Table } from "sequelize-typescript";
import OrderModel from "./order.model";
import OrderProductModel from "./orderProduct.model";

@Table({ tableName: "products", timestamps: false })
export default class ProductModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    id: string;

    @Column({ allowNull: false })
    name: string;

    @Column({ allowNull: false })
    description: string;

    @Column({ allowNull: false, field: "price" })
    salesPrice: number;

    @BelongsToMany(() => OrderModel, { through: { model: () => OrderProductModel }, foreignKey: "productId" })
    orders: OrderModel[];
}
