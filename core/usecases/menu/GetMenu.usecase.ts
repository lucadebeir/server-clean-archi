import Recipe from "../../domain/Recipe";
import MenuRepository from "../../ports/repositories/Menu.repository";

export default class GetMenuUseCase {
  constructor(private menuRepository: MenuRepository) {}

  async execute(): Promise<Recipe[]> {
    return await this.menuRepository.findMenu();
  }
}
