import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import ClientGateway from "../../gateway/client.gateway";
import { AddClientInputDto, AddClientOutputDto } from "./add-client.usecase.dto";

export default class AddClientUsecase {
    constructor(private clientRepository: ClientGateway) {}

    async execute(input: AddClientInputDto): Promise<AddClientOutputDto> {
        const client = new Client({
            name: input.name,
            email: input.email,
            address: input.address,
        });

        await this.clientRepository.add(client);

        return {
            id: client.id.id,
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
        };
    }
}
