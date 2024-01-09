import Address from "../../../@shared/domain/value-object/address.value-object";
import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItem from "../../domain/InvoiceItem.entity";
import Invoice from "../../domain/invoice.entity";
import GenerateInvoiceUsecase from "./generate-invoice.usecase";

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
        add: jest.fn().mockReturnValue(invoice),
        find: jest.fn(),
    };
};

describe("GenerateInvoiceUsecase unit test", () => {
    const InvoiceRepository = MockRepository();
    const sut = new GenerateInvoiceUsecase(InvoiceRepository);

    it("Should generate a Invoice", async () => {
        const input = {
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: invoice.items.map((item) => ({
                id: item.id.id,
                name: item.name,
                price: item.price,
            })),
        };

        const output = await sut.execute(input);

        expect(InvoiceRepository.add).toHaveBeenCalled();

        expect(output.id).toBeDefined();
        expect(output.name).toBe(invoice.name);
        expect(output.document).toBe(invoice.document);

        expect(output.street).toBe(invoice.address.street);
        expect(output.number).toBe(invoice.address.number);
        expect(output.complement).toBe(invoice.address.complement);
        expect(output.city).toBe(invoice.address.city);
        expect(output.state).toBe(invoice.address.state);
        expect(output.zipCode).toBe(invoice.address.zipCode);

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
