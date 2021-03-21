import UseIngredientRepository from "../../../../core/ports/repositories/UseIngredient.repository";
import AddIngredientToRecipeUseCase from "../../../../core/usecases/use-ingredient/AddIngredientToRecipe.usecase";
import DeleteIngredientFromRecipeUseCase from "../../../../core/usecases/use-ingredient/DeleteIngredientFromRecipe.usecase";
import UpdateIngredientFromRecipeUseCase from "../../../../core/usecases/use-ingredient/UpdateIngredientFromRecipe.usecase";
import UseIngredientRepositorySQL from "../../../secondaries/mysql/repositories/UseIngredientRepositorySQL";

export default class UseIngredientConfig {
  public useIngredientRepository: UseIngredientRepository = new UseIngredientRepositorySQL();

  public addIngredientToRecipeUseCase(): AddIngredientToRecipeUseCase {
    return new AddIngredientToRecipeUseCase(this.useIngredientRepository);
  }

  public updateIngredientFromRecipeUseCase(): UpdateIngredientFromRecipeUseCase {
    return new UpdateIngredientFromRecipeUseCase(this.useIngredientRepository);
  }

  public deleteIngredientFromRecipeUseCase(): DeleteIngredientFromRecipeUseCase {
    return new DeleteIngredientFromRecipeUseCase(this.useIngredientRepository);
  }
}
