import globalErrorHandler from "./globalErrorHandler";
import express, { NextFunction, Request } from "express";

import ClientAdmFacadeFactory from "../../modules/client-adm/factory/facade.factory";
import ProductAdmFacadeFactory from "../../modules/product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../modules/store-catalog/factory/facade.factory";
import InvoiceFacadeFactory from "../../modules/invoice/factory/facade.factory";
import PaymentFacadeFactory from "../../modules/payment/factory/payment.facade.factory";

import productRouter from "./routes/products.route";
import getCheckoutRouter from "./routes/checkout.route";
import clientRouter from "./routes/clients.route";
import invoiceRouter from "./routes/invoice.route";

const clientFacade = ClientAdmFacadeFactory.create();
const productAdmFacade = ProductAdmFacadeFactory.create();
const storeCatalogFacade = StoreCatalogFacadeFactory.create();
const invoiceFacade = InvoiceFacadeFactory.create();
const paymentFacade = PaymentFacadeFactory.create();

const app = express();
app.use(express.json());

const checkoutRouter = getCheckoutRouter({
    clientFacade,
    productAdmFacade,
    storeCatalogFacade,
    invoiceFacade,
    paymentFacade,
});

app.use("/products", productRouter);
app.use("/clients", clientRouter);
app.use("/checkout", checkoutRouter);
app.use("/invoice", invoiceRouter);

app.all("*", (req: Request, _, next: NextFunction) => {
    next(new Error(`Url ${req.originalUrl} Não encontrada!`));
});

app.use(globalErrorHandler);

export default app;
