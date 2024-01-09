import Id from "../../../@shared/domain/value-object/id.value-object";
import Transaction from "../../domain/transaction";
import ProcessPaymentUseCase from "./process-payment";

const MockRepository = () => {
    return {
        save: jest.fn().mockImplementation((input: Transaction) => Promise.resolve(input)),
    };
};

describe("Process payment usecase unit test", () => {
    const paymentRepository = MockRepository();
    const usecase = new ProcessPaymentUseCase(paymentRepository);

    it("should approve a transaction", async () => {
        const input = {
            orderId: "1",
            amount: 100,
        };

        const result = await usecase.execute(input);

        expect(result.transactionId).toBeDefined();
        expect(paymentRepository.save).toHaveBeenCalled();
        expect(result.status).toBe("approved");
        expect(result.amount).toBe(100);
        expect(result.orderId).toBe("1");
        expect(result.createdAt).toBeInstanceOf(Date);
        expect(result.updatedAt).toBeInstanceOf(Date);
    });

    it("should decline a transaction", async () => {
        const input = {
            orderId: "2",
            amount: 50,
        };

        const result = await usecase.execute(input);

        expect(result.transactionId).toBeDefined();
        expect(paymentRepository.save).toHaveBeenCalled();
        expect(result.status).toBe("declined");
        expect(result.amount).toBe(50);
        expect(result.orderId).toBe("2");
        expect(result.createdAt).toBeInstanceOf(Date);
        expect(result.updatedAt).toBeInstanceOf(Date);
    });
});
