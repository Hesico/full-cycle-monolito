import Id from "../../../@shared/domain/value-object/id.value-object";
import Transaction from "../../domain/transaction";
import ProcessPaymentUseCase from "./process-payment";

const transaction = new Transaction({
    id: new Id("1"),
    amount: 100,
    orderId: "1",
    status: "approved",
});

const transaction2 = new Transaction({
    id: new Id("2"),
    amount: 50,
    orderId: "2",
    status: "declined",
});

const MockRepository = () => {
    return {
        save: jest
            .fn()
            .mockImplementation((input: Transaction) =>
                Promise.resolve(input.orderId === "1" ? transaction : transaction2)
            ),
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

        expect(result.transactionId).toBe(transaction.id.id);
        expect(paymentRepository.save).toHaveBeenCalled();
        expect(result.status).toBe("approved");
        expect(result.amount).toBe(100);
        expect(result.orderId).toBe("1");
        expect(result.createdAt).toBe(transaction.createdAt);
        expect(result.updatedAt).toBe(transaction.updatedAt);
    });

    it("should decline a transaction", async () => {
        const input = {
            orderId: "2",
            amount: 50,
        };

        const result = await usecase.execute(input);

        expect(result.transactionId).toBe(transaction2.id.id);
        expect(paymentRepository.save).toHaveBeenCalled();
        expect(result.status).toBe("declined");
        expect(result.amount).toBe(50);
        expect(result.orderId).toBe("2");
        expect(result.createdAt).toBe(transaction2.createdAt);
        expect(result.updatedAt).toBe(transaction2.updatedAt);
    });
});
