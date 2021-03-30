import IngredientRepository from "../../../../core/ports/repositories/Ingredient.repository";
import RecipeRepository from "../../../../core/ports/repositories/Recipe.repository";
import UnityRepository from "../../../../core/ports/repositories/Unity.repository";
import UseIngredientRepository from "../../../../core/ports/repositories/UseIngredient.repository";
import AddIngredientToRecipeUseCase from "../../../../core/usecases/use-ingredient/AddIngredientToRecipe.usecase";
import DeleteIngredientFromRecipeUseCase from "../../../../core/usecases/use-ingredient/DeleteIngredientFromRecipe.usecase";
import UpdateIngredientFromRecipeUseCase from "../../../../core/usecases/use-ingredient/UpdateIngredientFromRecipe.usecase";
import IngredientRepositorySQL from "../../../secondaries/mysql/repositories/IngredientRepositorySQL";
import RecipeRepositorySQL from "../../../secondaries/mysql/repositories/RecipeRepositorySQL";
import UnityRepositorySQL from "../../../secondaries/mysql/repositories/UnityRepositorySQL";
import UseIngredientRepositorySQL from "../../../secondaries/mysql/repositories/UseIngredientRepositorySQL";

export default class UseIngredientConfig {
  public useIngredientRepository: UseIngredientRepository = new UseIngredientRepositorySQL();
  public unityRepository: UnityRepository = new UnityRepositorySQL();
  public ingredientRepository: IngredientRepository = new IngredientRepositorySQL();
  public recipeRepository: RecipeRepository = new RecipeRepositorySQL();

  public addIngredientToRecipeUseCase(): AddIngredientToRecipeUseCase {
    return new AddIngredientToRecipeUseCase(this.useIngredientRepository, this.unityRepository, this.ingredientRepository, this.recipeRepository);
  }

  public updateIngredientFromRecipeUseCase(): UpdateIngredientFromRecipeUseCase {
    return new UpdateIngredientFromRecipeUseCase(this.useIngredientRepository, this.unityRepository, this.ingredientRepository, this.recipeRepository);
  }

  public deleteIngredientFromRecipeUseCase(): DeleteIngredientFromRecipeUseCase {
    return new DeleteIngredientFromRecipeUseCase(this.useIngredientRepository, this.ingredientRepository, this.recipeRepository);
  }
}
