import Address from "../../@shared/domain/value-object/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItem from "../domain/InvoiceItem.entity";
import Invoice from "../domain/invoice.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import { InvoiceModel } from "./invoice.model";
import { InvoiceItemModel } from "./invoiceItem.model";

export default class InvoiceRepository implements InvoiceGateway {
    async add(invoice: Invoice): Promise<void> {
        const items = invoice.items.map((item) => ({
            id: item.id.id,
            name: item.name,
            price: item.price,
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
    }

    async find(id: string): Promise<Invoice> {
        const invoice = await InvoiceModel.findOne({
            where: { id },
            include: [{ model: InvoiceItemModel }],
        });

        if (!invoice) throw new Error("Invoice not found");

        return new Invoice({
            id: new Id(invoice.id),
            name: invoice.name,
            document: invoice.document,
            address: new Address({
                street: invoice.street,
                number: invoice.number,
                complement: invoice.complement,
                city: invoice.city,
                state: invoice.state,
                zipCode: invoice.zipCode,
            }),
            items: invoice.items.map(
                (item) =>
                    new InvoiceItem({
                        id: new Id(item.id),
                        name: item.name,
                        price: item.price,
                    })
            ),
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
        });
    }
}
