import Address from "../../../@shared/domain/value-object/address.value-object";
import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItem from "../../domain/InvoiceItem.entity";
import Invoice from "../../domain/invoice.entity";
import FindInvoiceUseCase from "./find-invoice.usecase";

const invoiceItems: InvoiceItem[] = [
    new InvoiceItem({
        name: "Item 1",
        price: 100,
    }),
    new InvoiceItem({
        name: "Item 2",
        price: 200,
    }),
    new InvoiceItem({
        name: "Item 3",
        price: 300,
    }),
];

const invoice = new Invoice({
    id: new Id("1"),
    name: "Invoice 1",
    document: "123456789",
    address: new Address({
        street: "Street",
        number: "123",
        complement: "Complement",
        city: "City",
        state: "State",
        zipCode: "12345678",
    }),
    items: invoiceItems,
});

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(invoice),
    };
};

describe("FindInvoiceUseCase unit test", () => {
    const InvoiceRepository = MockRepository();
    const sut = new FindInvoiceUseCase(InvoiceRepository);

    it("Should find a Invoice", async () => {
        const input = {
            id: "1",
        };

        const output = await sut.execute(input);

        expect(InvoiceRepository.find).toHaveBeenCalled();

        expect(output.id).toBe(invoice.id.id);
        expect(output.name).toBe(invoice.name);
        expect(output.document).toBe(invoice.document);

        expect(output.address.street).toBe(invoice.address.street);
        expect(output.address.number).toBe(invoice.address.number);
        expect(output.address.complement).toBe(invoice.address.complement);
        expect(output.address.city).toBe(invoice.address.city);
        expect(output.address.state).toBe(invoice.address.state);
        expect(output.address.zipCode).toBe(invoice.address.zipCode);

        expect(output.items.length).toBe(3);
        expect(output.items).toStrictEqual(
            invoice.items.map((item) => ({
                id: item.id.id,
                name: item.name,
                price: item.price,
            }))
        );

        expect(output.total).toBe(600);
    });
});
