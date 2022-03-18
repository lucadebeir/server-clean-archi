import RecipeList from "../../domain/RecipeList";
import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import RecipeListRepository from "../../ports/repositories/RecipeList.repository";
import UserRepository from "../../ports/repositories/User.repository";
import {isLogin} from "../../utils/token.service";

export default class AddRecipeToRecipeListUseCase {
  constructor(
    private recipeListRepository: RecipeListRepository,
    private userRepository: UserRepository
  ) {}

  async execute(recipe: RecipeList, token?: Token): Promise<RecipeList> {
    await this.checkBusinessRules(recipe, token);
    return await this.recipeListRepository.addRecipe(recipe);
  }

  private async checkBusinessRules(
    recipe: RecipeList,
    token?: Token
  ): Promise<void> {
    if (!token || !isLogin(token)) {
      throw new TechnicalException(
        "Vous n'avez pas le droit d'ajouter cette ressource"
      );
    } else {
      if (recipe.pseudo) {
        if (await !this.userRepository.existByPseudo(recipe.pseudo)) {
          throw new BusinessException("L'utilisateur n'existe pas");
        }
        if (token.pseudo !== recipe.pseudo) {
          throw new TechnicalException("Problème technique");
        }
        if (
          await this.recipeListRepository.existByName(
            recipe.name_recipe,
            recipe.pseudo
          )
        ) {
          throw new BusinessException(
            "La recette " +
              recipe.name_recipe +
              " se trouve déjà dans le menu de l'utilisateur " +
              recipe.pseudo
          );
        } else {
          if (recipe.name_recipe && recipe.name_recipe?.length > 60) {
            throw new BusinessException(
              "Le nom d'une recette ne doit pas dépasser 60 caractères"
            );
          }
        }
      } else {
        throw new BusinessException(
          "Le pseudo d'un utilisateur est obligatoire"
        );
      }
    }
  }
}
