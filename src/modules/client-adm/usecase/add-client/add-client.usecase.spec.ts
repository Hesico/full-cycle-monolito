import AddClientUsecase from "./add-client.usecase";

const MockRepository = () => ({
    add: jest.fn(),
    find: jest.fn(),
});

describe("Add Client Usecase", () => {
    it("should add a client", async () => {
        const clientRepository = MockRepository();
        const useCase = new AddClientUsecase(clientRepository);

        const input = {
            id: "1",
            name: "Client 1",
            email: "5SvO0@example.com",
            address: "Address 1",
        };

        const output = await useCase.execute(input);

        expect(clientRepository.add).toHaveBeenCalled();

        expect(output.id).toBeDefined();
        expect(output.name).toEqual(input.name);
        expect(output.email).toEqual(input.email);
        expect(output.address).toEqual(input.address);
        expect(output.createdAt).toBeInstanceOf(Date);
        expect(output.updatedAt).toBeInstanceOf(Date);
    });
});
