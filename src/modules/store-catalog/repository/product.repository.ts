import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductGateway {
    async findAll(): Promise<Product[]> {
        const productModels = await ProductModel.findAll();

        return productModels.map((productModel) => {
            return new Product({
                id: new Id(productModel.id),
                name: productModel.name,
                description: productModel.description,
                salesPrice: productModel.salesPrice,
            });
        });
    }
    async find(id: string): Promise<Product> {
        const productModel = await ProductModel.findOne({ where: { id } });

        if (!productModel) {
            throw new Error("Product not found");
        }

        return new Product({
            id: new Id(productModel.id),
            name: productModel.name,
            description: productModel.description,
            salesPrice: productModel.salesPrice,
        });
    }
}
