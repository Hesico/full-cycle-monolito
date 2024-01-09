import UsecaseInterface from "../../@shared/domain/usecase/usecase.interface";
import PaymentFacadeInterface, { PaymentFacadeInputDto, PaymentFacadeOutputDto } from "./facade.interface";

export default class PaymentFacade implements PaymentFacadeInterface {
    constructor(private _processPaymentUseCase: UsecaseInterface) {}

    process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
        return this._processPaymentUseCase.execute(input);
    }
}
