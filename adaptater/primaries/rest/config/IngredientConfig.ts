import IngredientRepository from "../../../../core/ports/repositories/Ingredient.repository";
import IngredientRepositorySQL from "../../../secondaries/mysql/repositories/IngredientRepositorySQL";
import GetAllIngredientsUseCase from "../../../../core/usecases/ingredient/GetAllIngredients.usecase"; 

export default class IngredientConfig {
    public ingredientRepository: IngredientRepository = new IngredientRepositorySQL();

    public getAllIngredientsUseCase(): GetAllIngredientsUseCase {
        return new GetAllIngredientsUseCase(this.ingredientRepository);
    }
}