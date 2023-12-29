import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "./product.model";
import Product from "../domain/product.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import ProductRepository from "./product.repository";

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

    it("should create a product", async () => {
        const product = new Product({
            id: new Id("1"),
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 100,
            stock: 10,
        });

        await productRepository.add(product);

        const productModel = await ProductModel.findOne({
            where: { id: "1" },
        });

        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 100,
            stock: 10,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        });
    });

    it("Should find a product", async () => {
        const product = new Product({
            id: new Id("1"),
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 100,
            stock: 10,
        });

        await ProductModel.create({
            id: product.id.id,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const productFound = await productRepository.find("1");

        expect(productFound.id.id).toEqual("1");
        expect(productFound.name).toEqual("Product 1");
        expect(productFound.description).toEqual("Product 1 description");
        expect(productFound.purchasePrice).toEqual(100);
        expect(productFound.stock).toEqual(10);
    });
});
