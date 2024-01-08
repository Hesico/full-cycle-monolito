import UsecaseInterface from "../../@shared/domain/usecase/usecase.interface";
import StoreCatalogFacadeInterface, {
    FindAllStoreCatalogFacadeOutputDto,
    FindStoreCatalogFacadeInputDto,
    FindStoreCatalogFacadeOutputDto,
} from "./store-catalog.facade.interface";

export interface UseCasesProps {
    findAllProductsUseCase: UsecaseInterface;
    findProductUseCase: UsecaseInterface;
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
    private _findAllProductsUseCase: UsecaseInterface;
    private _findProductUseCase: UsecaseInterface;

    constructor(props: UseCasesProps) {
        this._findAllProductsUseCase = props.findAllProductsUseCase;
        this._findProductUseCase = props.findProductUseCase;
    }

    find(input: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto> {
        return this._findProductUseCase.execute(input);
    }

    findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
        return this._findAllProductsUseCase.execute({});
    }
}
