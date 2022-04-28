import Recipe from "../../domain/Recipe";
import MenuRepository from "../../ports/repositories/Menu.repository";
import {updateDataRecipe} from "../../utils/recipe";

export default class FindMenuUsecase {
  constructor(private menuRepository: MenuRepository) {}

  execute = async (): Promise<Recipe[]> => {
    const result: Recipe[] = await this.menuRepository.findMenu();
    result.map((recipe) => updateDataRecipe(recipe));
    return result;
  };
}
