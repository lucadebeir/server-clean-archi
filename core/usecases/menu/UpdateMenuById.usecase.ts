import Recipe from "../../domain/Recipe";
import MenuRepository from "../../ports/repositories/Menu.repository";

export default class UpdateMenuByIdUseCase {
    constructor(private menuRepository: MenuRepository) {}

    async execute(id: any, idRecette: any): Promise<string> {
        return await this.menuRepository.updateById(id, idRecette);
    }
}