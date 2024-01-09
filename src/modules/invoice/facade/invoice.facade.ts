import UsecaseInterface from "../../@shared/domain/usecase/usecase.interface";
import InvoiceFacadeInterface, {
    FindInvoiceFacadeInputDTO,
    FindInvoiceFacadeOutputDTO,
    GenerateInvoiceFacadeInputDto,
    GenerateInvoiceFacadeOutputDto,
} from "./invoice.facade.interface";

export interface UseCasesProps {
    findInvoiceUseCase: UsecaseInterface;
    generateInvoiceUseCase: UsecaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
    private _findInvoiceUseCase: UsecaseInterface;
    private _generateInvoiceUseCase: UsecaseInterface;

    constructor(props: UseCasesProps) {
        this._findInvoiceUseCase = props.findInvoiceUseCase;
        this._generateInvoiceUseCase = props.generateInvoiceUseCase;
    }

    async findInvoice(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO> {
        return this._findInvoiceUseCase.execute(input);
    }

    async generateInvoice(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
        return this._generateInvoiceUseCase.execute(input);
    }
}
