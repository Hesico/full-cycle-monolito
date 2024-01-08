import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "./product.model";
import ProductRepository from "./product.repository";
import Product from "../domain/product.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

describe("Product Repository", () => {
    let productRepository: ProductRepository;
    let sequelize: Sequelize;

    beforeAll(async () => {
        productRepository = new ProductRepository();
    });

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

    it("should find all products", async () => {
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

        const products = await productRepository.findAll();

        expect(products.length).toBe(2);

        expect(products[0].id.id).toBe("1");
        expect(products[0].name).toBe("Product 1");
        expect(products[0].description).toBe("Product 1 description");
        expect(products[0].salesPrice).toBe(100);

        expect(products[1].id.id).toBe("2");
        expect(products[1].name).toBe("Product 2");
        expect(products[1].description).toBe("Product 2 description");
        expect(products[1].salesPrice).toBe(200);
    });

    it("Should find a product", async () => {
        const product = new Product({
            id: new Id("1"),
            name: "Product 1",
            description: "Product 1 description",
            salesPrice: 100,
        });

        await ProductModel.create({
            id: product.id.id,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice,
        });

        const productFound = await productRepository.find("1");

        expect(productFound.id.id).toEqual("1");
        expect(productFound.name).toEqual("Product 1");
        expect(productFound.description).toEqual("Product 1 description");
        expect(productFound.salesPrice).toEqual(100);
    });

    it("Should throw error when product not found", async () => {
        await expect(productRepository.find("1")).rejects.toThrow("Product not found");
    });
});
