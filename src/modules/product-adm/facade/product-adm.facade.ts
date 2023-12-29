import UsecaseInterface from "../../@shared/domain/usecase/usecase.interface";
import ProductAdmFacadeInterface, {
    AddProductFacadeInputDto,
    CheckStockFacadeInputDto,
    CheckStockFacadeOutputDto,
} from "./product-adm.facade.interface";

export interface UseCasesProps {
    addProductUseCase: UsecaseInterface;
    stockUseCase: UsecaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
    private _addProductUseCase: UsecaseInterface;
    private _stockUseCase: UsecaseInterface;

    constructor(props: UseCasesProps) {
        this._addProductUseCase = props.addProductUseCase;
        this._stockUseCase = props.stockUseCase;
    }

    async addProduct(input: AddProductFacadeInputDto): Promise<void> {
        return this._addProductUseCase.execute(input);
    }

    async checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
        return this._stockUseCase.execute(input);
    }
}
