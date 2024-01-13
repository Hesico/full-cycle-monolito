import express from "express";
import ClientsController from "../controller/clients.controller";
import ClientRepository from "../../../modules/client-adm/repository/client.repository";
import AddClientUseCase from "../../../modules/client-adm/usecase/add-client/add-client.usecase";

const clientRepository = new ClientRepository();
const addClientUseCase = new AddClientUseCase(clientRepository);
const controller = new ClientsController(addClientUseCase);

const router = express.Router();

router.post("/", (req, res, next) => controller.create(req, res, next));

export default router;
