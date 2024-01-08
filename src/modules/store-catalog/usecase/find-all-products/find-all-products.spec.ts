import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindAllProductsUseCase from "./find-all-products.usecase";

const product = new Product({
    id: new Id("1"),
    name: "Product 1",
    description: "Product 1 description",
    salesPrice: 10,
});

const product2 = new Product({
    id: new Id("2"),
    name: "Product 2",
    description: "Product 2 description",
    salesPrice: 20,
});

const mockRepository = () => {
    return {
        findAll: jest.fn().mockImplementation(() => {
            return Promise.resolve([product, product2]);
        }),
        find: jest.fn(),
    };
};

describe("Find all products usecase unit test", () => {
    it("should find all products", async () => {
        const productRepository = mockRepository();
        const usecase = new FindAllProductsUseCase(productRepository);
        const result = await usecase.execute();

        expect(productRepository.findAll).toHaveBeenCalled();
        expect(result.products.length).toBe(2);

        expect(result.products).toStrictEqual([
            {
                id: "1",
                name: "Product 1",
                description: "Product 1 description",
                salesPrice: 10,
            },
            {
                id: "2",
                name: "Product 2",
                description: "Product 2 description",
                salesPrice: 20,
            },
        ]);
    });
});
