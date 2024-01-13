import express from "express";
import InvoiceController from "../controller/invoice.controller";
import FindInvoiceUseCase from "../../../modules/invoice/usecase/find-invoice/find-invoice.usecase";
import InvoiceRepository from "../../../modules/invoice/repository/invoice.repository";

const invoiceRepository = new InvoiceRepository();
const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepository);
const controller = new InvoiceController(findInvoiceUseCase);

const router = express.Router();

router.get("/:id", (req, res, next) => controller.findOne(req, res, next));

export default router;
