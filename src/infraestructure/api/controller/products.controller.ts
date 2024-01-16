import { NextFunction, Request, Response } from "express";
import UsecaseInterface from "../../../modules/@shared/domain/usecase/usecase.interface";

export default class ProductsController {
    private _addProductUseCase: UsecaseInterface;

    constructor(addProductUseCase: UsecaseInterface) {
        this._addProductUseCase = addProductUseCase;
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const product = req.body;

        try {
            const output = await this._addProductUseCase.execute({
                name: product.name,
                description: product.description,
                purchasePrice: product.purchasePrice,
                stock: product.stock,
            });

            res.status(201).json({
                status: "sucess",
                data: {
                    product: output,
                },
            });
        } catch (error) {
            next(error);
        }
    }
}
