import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindProductUseCase from "./find-product.usecase";

const product = new Product({
    id: new Id("1"),
    name: "Product 1",
    description: "Product 1 description",
    salesPrice: 10,
});

const mockRepository = () => {
    return {
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
    };
};

describe("FindProduct usecase unit test", () => {
    it("should find a product", async () => {
        const productRepository = mockRepository();
        const usecase = new FindProductUseCase(productRepository);
        const result = await usecase.execute({ id: "1" });

        expect(productRepository.find).toHaveBeenCalled();
        expect(result).toStrictEqual({
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            salesPrice: 10,
        });
    });
});
