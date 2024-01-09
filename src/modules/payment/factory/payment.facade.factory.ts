import PaymentFacade from "../facade/facade.interface";
import PaymentFacadeInterface from "../facade/facade.interface";
import TransactionRepostiory from "../repository/transaction.repository";
import ProcessPaymentUseCase from "../usecase/process-payment/process-payment";

export default class PaymentFacadeFactory {
    static create(): PaymentFacadeInterface {
        const repository = new TransactionRepostiory();
        const usecase = new ProcessPaymentUseCase(repository);

        const facade = new PaymentFacade(usecase);

        return facade;
    }
}
