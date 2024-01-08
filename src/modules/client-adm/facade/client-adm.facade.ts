import UsecaseInterface from "../../@shared/domain/usecase/usecase.interface";
import ClientAdmFacadeInterface, {
    AddClientFacadeInputDto,
    FindClientFacadeInputDto,
    FindClientFacadeOutputDto,
} from "./client-adm.facade.interface";

export interface UseCasesProps {
    addClientUseCase: UsecaseInterface;
    findClientUseCase: UsecaseInterface;
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
    private _addClientUseCase: UsecaseInterface;
    private _findClientUseCase: UsecaseInterface;

    constructor(props: UseCasesProps) {
        this._addClientUseCase = props.addClientUseCase;
        this._findClientUseCase = props.findClientUseCase;
    }

    async addClient(input: AddClientFacadeInputDto): Promise<void> {
        await this._addClientUseCase.execute(input);
    }

    async findClient(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
        return this._findClientUseCase.execute(input);
    }
}
