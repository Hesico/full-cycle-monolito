import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../repository/product.model";
import ProductRepository from "../repository/product.repository";
import StoreCatalogFacadeFactory from "../factory/facade.factory";

describe("Product Adm Facade", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should find a product", async () => {
        await ProductModel.create({
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            salesPrice: 100,
        });

        const facade = StoreCatalogFacadeFactory.create();

        const product = await facade.find({ id: "1" });

        expect(product.id).toBe("1");
        expect(product.name).toBe("Product 1");
        expect(product.description).toBe("Product 1 description");
        expect(product.salesPrice).toBe(100);
    });

    it("Should find all products", async () => {
        await ProductModel.create({
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            salesPrice: 100,
        });

        await ProductModel.create({
            id: "2",
            name: "Product 2",
            description: "Product 2 description",
            salesPrice: 200,
        });

        const facade = StoreCatalogFacadeFactory.create();

        const products = await facade.findAll();

        expect(products.products.length).toBe(2);

        expect(products.products[0].id).toBe("1");
        expect(products.products[0].name).toBe("Product 1");
        expect(products.products[0].description).toBe("Product 1 description");
        expect(products.products[0].salesPrice).toBe(100);

        expect(products.products[1].id).toBe("2");
        expect(products.products[1].name).toBe("Product 2");
        expect(products.products[1].description).toBe("Product 2 description");
        expect(products.products[1].salesPrice).toBe(200);
    });
});
