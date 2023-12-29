import CheckStockUseCase from "./check-stock.usecase";

const product = {
    id: "1",
    name: "Product 1",
    description: "Product 1 description",
    purchasePrice: 100,
    stock: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
};

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
    };
};

describe("CheckStock Usecase unit test", () => {
    it("Should get a product stock", async () => {
        const productRepository = MockRepository();

        const usecase = new CheckStockUseCase(productRepository);
        const result = await usecase.execute({ id: "1" });

        expect(productRepository.find).toHaveBeenCalled();
        expect(result.productId).toBe("1");
        expect(result.stock).toBe(10);
    });
});
