import { Sequelize } from "sequelize-typescript";
import request from "supertest";
import { migrator } from "../../../config-migrations/migrator";
import app from "../../app";
import { ProductModel } from "../../../../modules/product-adm/repository/product.model";

describe("ProductsController e2e test", () => {
    let sequelize: Sequelize;

    beforeAll(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
        });

        sequelize.addModels([ProductModel]);
        await migrator(sequelize).up();
    });

    afterAll(async () => {
        await migrator(sequelize).down();
        await sequelize.close();
    });

    it("Should create a product", async () => {
        const product = {
            name: "test",
            description: "test",
            purchasePrice: 10,
            stock: 10,
        };

        const response = await request(app).post("/products").send(product).expect(201);

        expect(response.body).toHaveProperty("data");
        expect(response.body.data).toHaveProperty("product");

        const createdProduct = response.body.data.product;

        expect(createdProduct.id).toBeDefined();
        expect(createdProduct.name).toEqual(product.name);
        expect(createdProduct.description).toEqual(product.description);
        expect(createdProduct.purchasePrice).toEqual(product.purchasePrice);
        expect(createdProduct.stock).toEqual(product.stock);
    });
});
