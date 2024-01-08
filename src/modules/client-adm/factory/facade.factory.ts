import ClientAdmFacade from "../facade/client-adm.facade";
import ClientRepository from "../repository/client.repository";
import AddClientUsecase from "../usecase/add-client/add-client.usecase";
import FindClientUsecase from "../usecase/find-client/find-client.usecase";

export default class ClientAdmFacadeFactory {
    static create(): ClientAdmFacade {
        const productRepository = new ClientRepository();

        const addClientUseCase = new AddClientUsecase(productRepository);
        const findClientUseCase = new FindClientUsecase(productRepository);

        return new ClientAdmFacade({ addClientUseCase, findClientUseCase });
    }
}
