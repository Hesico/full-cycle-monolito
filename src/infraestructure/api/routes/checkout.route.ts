import express from "express";
import CheckoutController from "../controller/checkout.controller";
import PlaceOrderUseCase from "../../../modules/checkout/usecase/place-order/place-order.usecase";

import CheckoutRepository from "../../../modules/checkout/repository/checkout.repository";
import InvoiceFacadeInterface from "../../../modules/invoice/facade/invoice.facade.interface";
import ProductAdmFacadeInterface from "../../../modules/product-adm/facade/product-adm.facade.interface";
import StoreCatalogFacadeInterface from "../../../modules/store-catalog/facade/store-catalog.facade.interface";
import ClientAdmFacadeInterface from "../../../modules/client-adm/facade/client-adm.facade.interface";
import PaymentFacadeInterface from "../../../modules/payment/facade/facade.interface";

type CheckoutRouteProps = {
    clientFacade: ClientAdmFacadeInterface;
    productAdmFacade: ProductAdmFacadeInterface;
    storeCatalogFacade: StoreCatalogFacadeInterface;
    invoiceFacade: InvoiceFacadeInterface;
    paymentFacade: PaymentFacadeInterface;
};

export default function (props: CheckoutRouteProps) {
    const repository = new CheckoutRepository();

    const placeOrderUseCase = new PlaceOrderUseCase(
        props.clientFacade,
        props.productAdmFacade,
        props.storeCatalogFacade,
        repository,
        props.invoiceFacade,
        props.paymentFacade
    );

    const controller = new CheckoutController(placeOrderUseCase);

    const router = express.Router();
    router.post("/", (req, res, next) => controller.create(req, res, next));

    return router;
}
