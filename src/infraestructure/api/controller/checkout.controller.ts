import { NextFunction, Request, Response } from "express";
import UsecaseInterface from "../../../modules/@shared/domain/usecase/usecase.interface";

export default class CheckoutController {
    private _placeOrderUseCase: UsecaseInterface;

    constructor(placeOrderUseCase: UsecaseInterface) {
        this._placeOrderUseCase = placeOrderUseCase;
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const order = req.body;

        try {
            const output = await this._placeOrderUseCase.execute({
                clientId: order.clientId,
                products: order.products,
            });

            res.status(201).json({
                status: "sucess",
                data: {
                    order: output,
                },
            });
        } catch (error) {
            next(error);
        }
    }
}
