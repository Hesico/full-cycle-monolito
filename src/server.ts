import { Sequelize } from "sequelize-typescript";
import app from "./infraestructure/api/app";
import { ProductModel } from "./modules/product-adm/repository/product.model";

import OrderModel from "./modules/checkout/repository/order.model";
import OrderClientModel from "./modules/checkout/repository/client.model";
import OrderProductModel from "./modules/checkout/repository/product.model";
import OrderProductRelationModel from "./modules/checkout/repository/orderProduct.model";

import ClientModel from "./modules/client-adm/repository/client.model";
import TransactionModel from "./modules/payment/repository/transaction.model";

import StoreProductModel from "./modules/store-catalog/repository/product.model";

import InvoiceModel from "./modules/invoice/repository/invoice.model";
import InvoiceItemModel from "./modules/invoice/repository/invoiceItem.model";
import { migrator } from "./infraestructure/config-migrations/migrator";

connectDb();

async function connectDb() {
    const sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
    });

    sequelize.addModels([
        OrderProductRelationModel,
        OrderModel,
        ClientModel,
        OrderClientModel,
        TransactionModel,
        StoreProductModel,
        InvoiceItemModel,
        InvoiceModel,
        OrderProductModel,
        ProductModel,
    ]);

    await migrator(sequelize).runAsCLI(["up"]);

    console.log("Database connected");

    app.listen(3000, () => {
        console.log(`Server running at http://localhost:3000`);
    });
}
