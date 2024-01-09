import InvoiceFacade from "../facade/invoice.facade";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUsecase from "../usecase/generate-invoice/generate-invoice.usecase";

export default class InvoiceFacadeFactory {
    static create(): InvoiceFacade {
        const invoiceRepository = new InvoiceRepository();

        const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepository);
        const generateInvoiceUseCase = new GenerateInvoiceUsecase(invoiceRepository);

        return new InvoiceFacade({
            findInvoiceUseCase,
            generateInvoiceUseCase,
        });
    }
}
