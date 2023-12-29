import AddProductUseCase from "./add-product.usecase";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn(),
    };
};

describe("Add Product Usecase unit test", () => {
    it("Should add a product", async () => {
        const productRepository = MockRepository();

        const input = {
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 100,
            stock: 10,
        };

        const usecase = new AddProductUseCase(productRepository);
        const result = await usecase.execute(input);

        expect(productRepository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.description).toBe(input.description);
        expect(result.purchasePrice).toBe(input.purchasePrice);
        expect(result.stock).toBe(input.stock);
        expect(result.createdAt).toBeDefined();
        expect(result.updatedAt).toBeDefined();
    });
});
