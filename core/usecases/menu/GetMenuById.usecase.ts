import Recipe from "../../domain/Recipe";
import MenuRepository from "../../ports/repositories/Menu.repository";

export default class GetMenuBydIdUseCase {
    constructor(private menuRepository: MenuRepository) {}

    async execute(id: any): Promise<Recipe> {
        return await this.menuRepository.findById(id);
    }
}