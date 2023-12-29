import ProductGateway from "../../gateway/product.gateway";
import { CheckStockInputDto, CheckStockOutputDto } from "./check-stock.dto";

export default class CheckStockUseCase {
    constructor(private productRepository: ProductGateway) {}

    async execute(input: CheckStockInputDto): Promise<CheckStockOutputDto> {
        const product = await this.productRepository.find(input.id);

        return {
            productId: input.id,
            stock: product.stock,
        };
    }
}
