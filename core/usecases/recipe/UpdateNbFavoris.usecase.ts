import RecipeRepository from "../../ports/repositories/Recipe.repository";

export default class UpdateNbFavorisUsecase {
    constructor(private recipeRepository: RecipeRepository) {} //constructeur avec l'interface

    execute = async (id: any): Promise<string> => await this.recipeRepository.updateNbFavoris(id);
}
