import express from "express";
import ProductsController from "../controller/products.controller";
import ProductRepository from "../../../modules/product-adm/repository/product.repository";
import AddProductUseCase from "../../../modules/product-adm/usecase/add-product/add-product.usecase";

const productRepository = new ProductRepository();
const addProductUseCase = new AddProductUseCase(productRepository);
const controller = new ProductsController(addProductUseCase);

const router = express.Router();

router.post("/", (req, res, next) => controller.create(req, res, next));

export default router;
