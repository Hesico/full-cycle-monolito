import { NextFunction, Request, Response } from "express";
import UsecaseInterface from "../../../modules/@shared/domain/usecase/usecase.interface";

export default class ClientsController {
    private _addClientUseCase: UsecaseInterface;

    constructor(addClientUseCase: UsecaseInterface) {
        this._addClientUseCase = addClientUseCase;
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const client = req.body;

        try {
            const output = await this._addClientUseCase.execute({
                name: client.name,
                email: client.email,
                document: client.document,
                street: client.street,
                number: client.number,
                complement: client.complement,
                city: client.city,
                state: client.state,
                zipCode: client.zipCode,
            });

            res.status(201).json({
                status: "sucess",
                data: {
                    data: output,
                },
            });
        } catch (error) {
            next(error);
        }
    }
}
