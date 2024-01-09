import UsecaseInterface from "../../@shared/domain/usecase/usecase.interface";
import PaymentFacadeInterface from "./facade.interface";
import { PaymentFacadeInputDto, PaymentFacadeOutputDto } from "./payment.facade";

export default class PaymentFacade implements PaymentFacadeInterface {
    constructor(private processPaymentUseCase: UsecaseInterface) {}

    process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
        return this.processPaymentUseCase.execute(input);
    }
}
