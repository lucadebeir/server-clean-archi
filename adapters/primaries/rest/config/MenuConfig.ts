import MenuRepository from "../../../../core/ports/repositories/Menu.repository";
import RecipeRepository from "../../../../core/ports/repositories/Recipe.repository";
import FindMenuUsecase from "../../../../core/usecases/menu/FindMenu.usecase";
import GetMenuBydIdUseCase from "../../../../core/usecases/menu/FindMenuById.usecase";
import UpdateMenuByIdUseCase from "../../../../core/usecases/menu/UpdateMenuById.usecase";
import MenuRepositorySQL from "../../../secondaries/mysql/repositories/MenuRepositorySQL";
import RecipeRepositorySQL from "../../../secondaries/mysql/repositories/RecipeRepositorySQL";

export default class MenuConfig {
  private menuRepository: MenuRepository = new MenuRepositorySQL();
  private recipeRepository: RecipeRepository = new RecipeRepositorySQL();

  public getMenuUseCase(): FindMenuUsecase {
    return new FindMenuUsecase(this.menuRepository);
  }

  public getMenuByIdUseCase(): GetMenuBydIdUseCase {
    return new GetMenuBydIdUseCase(this.menuRepository);
  }

  public updateMenuByIdUseCase(): UpdateMenuByIdUseCase {
    return new UpdateMenuByIdUseCase(
      this.menuRepository,
      this.recipeRepository
    );
  }
}
