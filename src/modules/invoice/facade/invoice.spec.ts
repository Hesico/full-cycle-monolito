import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "../repository/invoice.model";
import { InvoiceItemModel } from "../repository/invoiceItem.model";
import InvoiceFacadeFactory from "../factory/facade.factory";
import Invoice from "../domain/invoice.entity";
import InvoiceItem from "../domain/InvoiceItem.entity";
import Address from "../../@shared/domain/value-object/address.value-object";

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

describe("Invoice Facade", () => {
    let sequelize: Sequelize;

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

    it("should generate a Invoice", async () => {
        const InvoiceFacade = InvoiceFacadeFactory.create();

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

        const result = await InvoiceFacade.generateInvoice(input);

        expect(result.id).toBeDefined();
        delete result.id;

        expect(result).toStrictEqual({
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
            total: 600,
        });
    });

    // it("Should get a Invoice", async () => {
    //     const productAdmFacade = ProductAdmFacadeFactory.create();

    //     await ProductModel.create({
    //         id: "1",
    //         name: "Product 1",
    //         description: "Product 1 description",
    //         purchasePrice: 100,
    //         stock: 10,
    //         createdAt: new Date(),
    //         updatedAt: new Date(),
    //     });

    //     const Stock = await productAdmFacade.checkStock({ id: "1" });

    //     expect(Stock.productId).toBe("1");
    //     expect(Stock.stock).toBe(10);
    // });
});
