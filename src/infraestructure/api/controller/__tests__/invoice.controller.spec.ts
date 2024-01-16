import { Sequelize } from "sequelize-typescript";
import request from "supertest";
import { migrator } from "../../../config-migrations/migrator";
import app from "../../app";
import InvoiceModel from "../../../../modules/invoice/repository/invoice.model";
import InvoiceItemModel from "../../../../modules/invoice/repository/invoiceItem.model";
import Invoice from "../../../../modules/invoice/domain/invoice.entity";
import Address from "../../../../modules/@shared/domain/value-object/address.value-object";
import InvoiceItem from "../../../../modules/invoice/domain/InvoiceItem.entity";

describe("InvoiceController e2e test", () => {
    let sequelize: Sequelize;

    beforeAll(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
        });

        sequelize.addModels([InvoiceModel, InvoiceItemModel]);
        await migrator(sequelize).up();
    });

    afterAll(async () => {
        await migrator(sequelize).down();
        await sequelize.close();
    });

    it("Should find a invoice", async () => {
        const invoice = new Invoice({
            name: "Test",
            document: "Test",
            address: new Address({
                street: "Test",
                number: "Test",
                complement: "Test",
                city: "Test",
                state: "Test",
                zipCode: "Test",
            }),
            items: [
                new InvoiceItem({
                    name: "Test",
                    price: 10,
                }),
            ],
        });

        const items = invoice.items.map((item) => ({
            id: item.id.id,
            name: item.name,
            price: item.price,
            invoiceId: invoice.id.id,
        }));

        await InvoiceModel.create(
            {
                id: invoice.id.id,
                name: invoice.name,
                document: invoice.document,
                street: invoice.address.street,
                number: invoice.address.number,
                complement: invoice.address.complement,
                city: invoice.address.city,
                state: invoice.address.state,
                zipCode: invoice.address.zipCode,
                items,
                total: invoice.total,
                createdAt: invoice.createdAt,
                updatedAt: invoice.updatedAt,
            },
            {
                include: [{ model: InvoiceItemModel }],
            }
        );

        const response = await request(app).get(`/invoice/${invoice.id.id}`).expect(200);

        expect(response.body).toHaveProperty("data");
        expect(response.body.data).toHaveProperty("invoice");

        const createdInvoice = response.body.data.invoice;

        expect(createdInvoice.id).toBeDefined();
        expect(createdInvoice.name).toEqual(invoice.name);
        expect(createdInvoice.document).toEqual(invoice.document);
        expect(createdInvoice.address.street).toEqual(invoice.address.street);
        expect(createdInvoice.address.number).toEqual(invoice.address.number);
        expect(createdInvoice.address.complement).toEqual(invoice.address.complement);
        expect(createdInvoice.address.city).toEqual(invoice.address.city);
        expect(createdInvoice.address.state).toEqual(invoice.address.state);
        expect(createdInvoice.address.zipCode).toEqual(invoice.address.zipCode);

        expect(createdInvoice.total).toEqual(invoice.total);

        expect(createdInvoice.items).toHaveLength(1);
        expect(createdInvoice.items[0].id).toBeDefined();
        expect(createdInvoice.items[0].name).toEqual(invoice.items[0].name);
        expect(createdInvoice.items[0].price).toEqual(invoice.items[0].price);
    });
});
