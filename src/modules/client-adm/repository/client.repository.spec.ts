import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import ClientRepository from "./client.repository";
import { ClientModel } from "./client.model";
import Client from "../domain/client.entity";

describe("Cluent Repository", () => {
    let clientRepository: ClientRepository;
    let sequelize: Sequelize;

    beforeAll(async () => {
        clientRepository = new ClientRepository();
    });

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

    it("should create a client", async () => {
        const client = new Client({
            id: new Id("1"),
            name: "Product 1",
            email: "Product 1 description",
            address: "Product 1 description",
        });

        await clientRepository.add(client);

        const productModel = await ClientModel.findOne({
            where: { id: "1" },
        });

        expect(productModel.id).toEqual(client.id.id);
        expect(productModel.name).toEqual(client.name);
        expect(productModel.email).toEqual(client.email);
        expect(productModel.address).toEqual(client.address);
        expect(productModel.createdAt).toBeInstanceOf(Date);
        expect(productModel.updatedAt).toBeInstanceOf(Date);
    });

    it("Should find a product", async () => {
        await ClientModel.create({
            id: "1",
            name: "client 1",
            email: "client 1 email",
            address: "client 1 address",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const clientRetorned = await clientRepository.find("1");

        expect(clientRetorned.id.id).toEqual("1");
        expect(clientRetorned.name).toEqual("client 1");
        expect(clientRetorned.email).toEqual("client 1 email");
        expect(clientRetorned.address).toEqual("client 1 address");
        expect(clientRetorned.createdAt).toBeInstanceOf(Date);
        expect(clientRetorned.updatedAt).toBeInstanceOf(Date);
    });
});
