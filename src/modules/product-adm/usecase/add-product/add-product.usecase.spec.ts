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
        usecase.execute(input);
    });
});
