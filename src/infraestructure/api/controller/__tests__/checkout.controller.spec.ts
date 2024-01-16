import { Sequelize } from "sequelize-typescript";
import request from "supertest";
import { migrator } from "../../../config-migrations/migrator";
import app from "../../app";

import OrderModel from "../../../../modules/checkout/repository/order.model";
import OrderClientModel from "../../../../modules/checkout/repository/client.model";
import OrderProductModel from "../../../../modules/checkout/repository/product.model";
import OrderProductRelationModel from "../../../../modules/checkout/repository/orderProduct.model";

import ClientModel from "../../../../modules/client-adm/repository/client.model";
import TransactionModel from "../../../../modules/payment/repository/transaction.model";

import StoreProductModel from "../../../../modules/store-catalog/repository/product.model";

import InvoiceModel from "../../../../modules/invoice/repository/invoice.model";
import InvoiceItemModel from "../../../../modules/invoice/repository/invoiceItem.model";
import { ProductModel } from "../../../../modules/product-adm/repository/product.model";

import { QueryTypes } from "sequelize";
import Id from "../../../../modules/@shared/domain/value-object/id.value-object";

describe("CheckoutController e2e test", () => {
    let sequelize: Sequelize;

    beforeAll(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
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
        await migrator(sequelize).up();
    });

    afterAll(async () => {
        await migrator(sequelize).down();
        await sequelize.close();
    });

    it("Should place a order", async () => {
        const product = {
            id: new Id().id,
            name: "test",
            description: "test",
            salesPrice: 200,
            purchasePrice: 150,
            stock: 10,
        };

        // Não há interface pra atualização de salesPrice e de stock em um mesmo produto
        await sequelize.query(
            `INSERT INTO products (
                id,
                name,
                description,
                "purchasePrice",
                "salesPrice",
                "stock",
                "createdAt",
                "updatedAt"
            ) VALUES (
                "${product.id}", 
                "${product.name}", 
                "${product.description}", 
                ${product.purchasePrice}, 
                ${product.salesPrice}, 
                ${product.stock},
                date('now'), 
                date('now')
            )`,
            { type: QueryTypes.INSERT }
        );

        const client = {
            id: new Id().id,
            name: "test",
            email: "test",
            document: "test",
            street: "test",
            number: "test",
            complement: "test",
            city: "test",
            state: "test",
            zipCode: "test",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await ClientModel.create(client);

        const response = await request(app)
            .post("/checkout")
            .send({
                clientId: client.id,
                products: [
                    {
                        productId: product.id,
                    },
                ],
            })
            .expect(201);

        expect(response.body).toHaveProperty("data");
        expect(response.body.data).toHaveProperty("order");

        const createdOrder = response.body.data.order;

        expect(createdOrder.id).toBeDefined();
        expect(createdOrder.total).toEqual(200);
        expect(createdOrder.status).toEqual("approved");
        expect(createdOrder.invoiceId).not.toEqual(null);
        expect(createdOrder.products).toHaveLength(1);
        expect(createdOrder.products[0].productId).toEqual(product.id);

        const createdInvoice = await InvoiceModel.findOne({
            where: {
                id: createdOrder.invoiceId,
            },
        });

        expect(createdInvoice).toBeDefined();
    });

    it("Should not place a order", async () => {
        const response = await request(app).post("/checkout").send({}).expect(500);

        expect(response.body).toHaveProperty("error");
    });

    it("Should not aprove a order", async () => {
        const product = {
            id: new Id().id,
            name: "test",
            description: "test",
            salesPrice: 90,
            purchasePrice: 50,
            stock: 10,
        };

        // Não há interface pra atualização de salesPrice e de stock em um mesmo produto
        await sequelize.query(
            `INSERT INTO products (
                id,
                name,
                description,
                "purchasePrice",
                "salesPrice",
                "stock",
                "createdAt",
                "updatedAt"
            ) VALUES (
                "${product.id}", 
                "${product.name}", 
                "${product.description}", 
                ${product.purchasePrice}, 
                ${product.salesPrice}, 
                ${product.stock},
                date('now'), 
                date('now')
            )`,
            { type: QueryTypes.INSERT }
        );

        const client = {
            id: new Id().id,
            name: "test",
            email: "test",
            document: "test",
            street: "test",
            number: "test",
            complement: "test",
            city: "test",
            state: "test",
            zipCode: "test",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await ClientModel.create(client);

        const response = await request(app)
            .post("/checkout")
            .send({
                clientId: client.id,
                products: [
                    {
                        productId: product.id,
                    },
                ],
            })
            .expect(201);

        expect(response.body).toHaveProperty("data");
        expect(response.body.data).toHaveProperty("order");

        const createdOrder = response.body.data.order;

        expect(createdOrder.id).toBeDefined();
        expect(createdOrder.total).toEqual(90);
        expect(createdOrder.status).toEqual("pending");
        expect(createdOrder.invoiceId).toEqual(null);
        expect(createdOrder.products).toHaveLength(1);
        expect(createdOrder.products[0].productId).toEqual(product.id);
    });
});
