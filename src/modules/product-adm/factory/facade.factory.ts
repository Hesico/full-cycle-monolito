import ProductAdmFacade from "../facade/product-adm.facade";
import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";

export default class ProductAdmFacadeFactory {
    static create(): ProductAdmFacade {
        const productRepository = new ProductRepository();
        const addProductUseCase = new AddProductUseCase(productRepository);

        return new ProductAdmFacade({
            addProductUseCase: addProductUseCase,
            stockUseCase: undefined,
        });
    }
}
