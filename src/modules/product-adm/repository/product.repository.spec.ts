import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "./product.model";
import Product from "../domain/product.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

describe("Product Repository", () => {
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

    it("should create a product", async () => {
        const productRepository = new ProductRepository();

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
            purchase_price: 100,
            stock: 10,
            created_at: product.createdAt,
            updated_at: product.updatedAt,
        });
    });
});
