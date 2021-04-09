import ShoppingRepository from "../../../../core/ports/repositories/Shopping.repository";
import UserRepository from "../../../../core/ports/repositories/User.repository";
import AddIngredientsOfRecipeToShoppingListUseCase from "../../../../core/usecases/shopping-list/AddIngredientsOfRecipeToShoppingList.usecase";
import AddIngredientToShoppingListUseCase from "../../../../core/usecases/shopping-list/AddIngredientToShoppingList.usecase";
import DeleteByIdUseCase from "../../../../core/usecases/shopping-list/DeleteById.usecase";
import GetIngredientsNotInShoppingListByIdUseCase from "../../../../core/usecases/shopping-list/GetIngredientsNotInShoppingListById.usecase";
import GetShoppingListByIdUseCase from "../../../../core/usecases/shopping-list/GetShoppingListById.usecase";
import ShoppingRepositorySQL from "../../../secondaries/mysql/repositories/ShoppingRepositorySQL";
import UserRepositorySQL from "../../../secondaries/mysql/repositories/UserRepositorySQL";

export default class ShoppingConfig {
  private shoppingRepository: ShoppingRepository = new ShoppingRepositorySQL();
  private userRepository: UserRepository = new UserRepositorySQL();

  public addIngredientToShoppingList(): AddIngredientToShoppingListUseCase {
    return new AddIngredientToShoppingListUseCase(
      this.shoppingRepository,
      this.userRepository
    );
  }

  public addIngredientsOfRecipeToShoppingList(): AddIngredientsOfRecipeToShoppingListUseCase {
    return new AddIngredientsOfRecipeToShoppingListUseCase(
      this.shoppingRepository,
      this.userRepository
    );
  }

  public getShoppingListByIdUseCase(): GetShoppingListByIdUseCase {
    return new GetShoppingListByIdUseCase(
      this.shoppingRepository,
      this.userRepository
    );
  }

  public getIngredientsNotInShoppingListByIdUseCase(): GetIngredientsNotInShoppingListByIdUseCase {
    return new GetIngredientsNotInShoppingListByIdUseCase(
      this.shoppingRepository,
      this.userRepository
    );
  }

  public deleteById(): DeleteByIdUseCase {
    return new DeleteByIdUseCase(this.shoppingRepository, this.userRepository);
  }
}
