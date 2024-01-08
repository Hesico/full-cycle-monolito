import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/client.model";
import ClientAdmFacadeFactory from "../factory/facade.factory";

describe("Client Adm Facade", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ClientModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a Client", async () => {
        const ClientAdmFacade = ClientAdmFacadeFactory.create();

        const input = {
            id: "1",
            name: "client 1",
            email: "client 1 description",
            address: "address 1",
        };

        await ClientAdmFacade.addClient(input);

        const client = await ClientModel.findOne({ where: { id: "1" } });

        expect(client).toBeDefined();
        expect(client.id).toBe("1");
        expect(client.name).toBe(input.name);
        expect(client.email).toBe(input.email);
        expect(client.address).toBe(input.address);
        expect(client.createdAt).toBeInstanceOf(Date);
        expect(client.updatedAt).toBeInstanceOf(Date);
    });

    it("Should find client", async () => {
        const ClientAdmFacade = ClientAdmFacadeFactory.create();

        await ClientModel.create({
            id: "1",
            name: "client 1",
            email: "client 1 description",
            address: "address 1",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const client = await ClientAdmFacade.findClient({ id: "1" });

        expect(client.id).toBe("1");
        expect(client.name).toBe("client 1");
        expect(client.email).toBe("client 1 description");
        expect(client.address).toBe("address 1");
        expect(client.createdAt).toBeInstanceOf(Date);
        expect(client.updatedAt).toBeInstanceOf(Date);
    });
});
