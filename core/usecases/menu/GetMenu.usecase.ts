import Menu from "../../domain/Menu";
import MenuRepository from "../../ports/repositories/Menu.repository";

export default class GetMenuUseCase {
    constructor(private menuRepository: MenuRepository) {}

    async execute(): Promise<Menu> {
        return await this.menuRepository.findMenu();
    }
}