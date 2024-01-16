import { AutoIncrement, BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import ProductModel from "./product.model";
import OrderModel from "./order.model";

@Table({ tableName: "orderProducts", timestamps: false })
export default class OrderProductModel extends Model {
    @ForeignKey(() => OrderModel)
    @Column
    declare orderId: string;

    @BelongsTo(() => OrderModel)
    declare order: OrderModel;

    @ForeignKey(() => ProductModel)
    @Column
    declare productId: string;

    @BelongsTo(() => ProductModel)
    declare product: ProductModel;
}
