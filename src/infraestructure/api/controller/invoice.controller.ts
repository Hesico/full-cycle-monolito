import { NextFunction, Request, Response } from "express";
import UsecaseInterface from "../../../modules/@shared/domain/usecase/usecase.interface";

export default class InvoiceController {
    private _findInvoiceUseCase: UsecaseInterface;

    constructor(findInvoiceUseCase: UsecaseInterface) {
        this._findInvoiceUseCase = findInvoiceUseCase;
    }

    async findOne(req: Request, res: Response, next: NextFunction) {
        try {
            const output = await this._findInvoiceUseCase.execute({
                id: req.params.id,
            });

            res.status(200).json({
                status: "sucess",
                data: {
                    invoice: output,
                },
            });
        } catch (error) {
            next(error);
        }
    }
}
