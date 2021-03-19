import ShoppingRepository from "../../../../core/ports/repositories/Shopping.repository";
import AddIngredientsOfRecipeToShoppingListUseCase from "../../../../core/usecases/shopping-list/AddIngredientsOfRecipeToShoppingList.usecase";
import AddIngredientToShoppingListUseCase from "../../../../core/usecases/shopping-list/AddIngredientToShoppingList.usecase";
import DeleteByIdUseCase from "../../../../core/usecases/shopping-list/DeleteById.usecase";
import GetIngredientsNotInShoppingListByIdUseCase from "../../../../core/usecases/shopping-list/GetIngredientsNotInShoppingListById.usecase";
import GetShoppingListByIdUseCase from "../../../../core/usecases/shopping-list/GetShoppingListById.usecase";
import ShoppingRepositorySQL from "../../../secondaries/mysql/repositories/ShoppingRepositorySQL";

export default class ShoppingConfig {
  public shoppingRepository: ShoppingRepository = new ShoppingRepositorySQL();

  public addIngredientToShoppingList(): AddIngredientToShoppingListUseCase {
    return new AddIngredientToShoppingListUseCase(this.shoppingRepository);
  }

  public addIngredientsOfRecipeToShoppingList(): AddIngredientsOfRecipeToShoppingListUseCase {
    return new AddIngredientsOfRecipeToShoppingListUseCase(
      this.shoppingRepository
    );
  }

  public getShoppingListByIdUseCase(): GetShoppingListByIdUseCase {
    return new GetShoppingListByIdUseCase(this.shoppingRepository);
  }

  public getIngredientsNotInShoppingListByIdUseCase(): GetIngredientsNotInShoppingListByIdUseCase {
    return new GetIngredientsNotInShoppingListByIdUseCase(
      this.shoppingRepository
    );
  }

  public deleteById(): DeleteByIdUseCase {
    return new DeleteByIdUseCase(this.shoppingRepository);
  }
}
