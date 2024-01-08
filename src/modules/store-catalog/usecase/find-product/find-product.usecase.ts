import UsecaseInterface from "../../../@shared/domain/usecase/usecase.interface";
import ProductGateway from "../../gateway/product.gateway";
import { FindProductInputDto, FindProductOutputDto } from "./find-product.dto";

export default class FindProductUseCase implements UsecaseInterface {
    constructor(private readonly productRepository: ProductGateway) {}

    async execute(props: FindProductInputDto): Promise<FindProductOutputDto> {
        const product = await this.productRepository.find(props.id);

        return {
            id: product.id.id,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice,
        };
    }
}
