export default interface UsecaseInterface {
    execute(props: any): Promise<any>;
}
