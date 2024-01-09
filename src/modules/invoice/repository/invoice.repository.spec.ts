import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceRepository from "./invoice.repository";
import { InvoiceModel } from "./invoice.model";
import { InvoiceItemModel } from "./invoiceItem.model";
import InvoiceItem from "../domain/InvoiceItem.entity";
import Address from "../../@shared/domain/value-object/address.value-object";
import Invoice from "../domain/invoice.entity";

describe("Invoice Repository", () => {
    let invoiceRepository: InvoiceRepository;
    let sequelize: Sequelize;

    beforeAll(async () => {
        invoiceRepository = new InvoiceRepository();
    });

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([InvoiceModel, InvoiceItemModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a Invoice", async () => {
        const items: InvoiceItem[] = [
            new InvoiceItem({
                id: new Id("1"),
                name: "Product 1",
                price: 100,
            }),
            new InvoiceItem({
                id: new Id("2"),
                name: "Product 2",
                price: 200,
            }),
        ];

        const address: Address = new Address({
            street: "Street 1",
            number: "1",
            complement: "Complement 1",
            city: "City 1",
            state: "State 1",
            zipCode: "ZipCode 1",
        });

        const invoice = new Invoice({
            id: new Id("1"),
            name: "Invoice 1",
            document: "Document 1",
            address: address,
            items: items,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await invoiceRepository.add(invoice);

        const invoiceModel = await InvoiceModel.findOne({
            where: { id: "1" },
            include: [{ model: InvoiceItemModel }],
        });

        expect(invoiceModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Invoice 1",
            document: "Document 1",
            street: "Street 1",
            number: "1",
            complement: "Complement 1",
            city: "City 1",
            state: "State 1",
            zipCode: "ZipCode 1",
            items: [
                { id: "1", name: "Product 1", price: 100, invoiceId: "1" },
                { id: "2", name: "Product 2", price: 200, invoiceId: "1" },
            ],
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        });
    });

    it("Should find a invoice", async () => {
        await InvoiceModel.create(
            {
                id: "1",
                name: "Invoice 1",
                document: "Document 1",
                street: "Street 1",
                number: "1",
                complement: "Complement 1",
                city: "City 1",
                state: "State 1",
                zipCode: "ZipCode 1",
                items: [
                    { id: "1", name: "Product 1", price: 100 },
                    { id: "2", name: "Product 2", price: 200 },
                ],
                total: 300,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                include: [{ model: InvoiceItemModel }],
            }
        );

        const invoice = await invoiceRepository.find("1");

        expect(invoice.id.id).toBe("1");
        expect(invoice.name).toBe("Invoice 1");
        expect(invoice.document).toBe("Document 1");

        expect(invoice.address.street).toBe("Street 1");
        expect(invoice.address.number).toBe("1");
        expect(invoice.address.complement).toBe("Complement 1");
        expect(invoice.address.city).toBe("City 1");
        expect(invoice.address.state).toBe("State 1");
        expect(invoice.address.zipCode).toBe("ZipCode 1");

        expect(invoice.items.length).toBe(2);
        expect(
            invoice.items.map((e) => {
                return {
                    id: e.id.id,
                    name: e.name,
                    price: e.price,
                };
            })
        ).toStrictEqual([
            {
                id: "1",
                name: "Product 1",
                price: 100,
            },
            {
                id: "2",
                name: "Product 2",
                price: 200,
            },
        ]);
    });

    it("Should throw error when invoice not found", async () => {
        await expect(invoiceRepository.find("1")).rejects.toThrowError(new Error("Invoice not found"));
    });
});
