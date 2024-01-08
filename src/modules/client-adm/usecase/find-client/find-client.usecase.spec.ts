import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import FindClientUsecase from "./find-client.usecase";

const client = new Client({
    id: new Id("1"),
    name: "Client 1",
    email: "5SvO0@example.com",
    address: "Address 1",
});

const MockRepository = () => ({
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(client)),
});

describe("Add Client Usecase", () => {
    it("should add a client", async () => {
        const clientRepository = MockRepository();
        const useCase = new FindClientUsecase(clientRepository);

        const input = {
            id: "1",
        };

        const output = await useCase.execute(input);

        expect(clientRepository.find).toHaveBeenCalled();

        expect(output.id).toBeDefined();
        expect(output.name).toEqual(client.name);
        expect(output.email).toEqual(client.email);
        expect(output.address).toEqual(client.address);
        expect(output.createdAt).toBeInstanceOf(Date);
        expect(output.updatedAt).toBeInstanceOf(Date);
    });
});
