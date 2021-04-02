import Recipe from "../../domain/Recipe";
import TokenDomain from "../../domain/Token.domain";
import MenuRepository from "../../ports/repositories/Menu.repository";

export default class GetMenuBydIdUseCase {
    constructor(private menuRepository: MenuRepository) {}

    async execute(id: any, token?: TokenDomain): Promise<Recipe> {
        return await this.menuRepository.findById(id);
    }
}