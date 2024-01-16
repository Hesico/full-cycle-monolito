import { Sequelize } from "sequelize-typescript";
import request from "supertest";
import ClientModel from "../../../../modules/client-adm/repository/client.model";
import { migrator } from "../../../config-migrations/migrator";
import app from "../../app";

describe("ClientsController e2e test", () => {
    let sequelize: Sequelize;

    beforeAll(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
        });

        sequelize.addModels([ClientModel]);
        await migrator(sequelize).runAsCLI(["up"]);
    });

    afterAll(async () => {
        await migrator(sequelize).down();
        await sequelize.close();
    });

    it("Should create a client", async () => {
        const client = {
            name: "test",
            email: "test",
            document: "test",
            street: "test",
            number: "test",
            complement: "test",
            city: "test",
            state: "test",
            zipCode: "test",
        };

        const response = await request(app).post("/clients").send(client).expect(201);

        expect(response.body).toHaveProperty("data");
        expect(response.body.data).toHaveProperty("client");

        const createdClient = response.body.data.client;

        expect(createdClient.id).toBeDefined();
        expect(createdClient.name).toEqual(client.name);
        expect(createdClient.email).toEqual(client.email);
        expect(createdClient.document).toEqual(client.document);
        expect(createdClient.street).toEqual(client.street);
        expect(createdClient.number).toEqual(client.number);
        expect(createdClient.complement).toEqual(client.complement);
        expect(createdClient.city).toEqual(client.city);
        expect(createdClient.state).toEqual(client.state);
        expect(createdClient.zipCode).toEqual(client.zipCode);
    });
});
