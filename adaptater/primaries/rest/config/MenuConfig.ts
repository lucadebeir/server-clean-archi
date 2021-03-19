import MenuRepository from "../../../../core/ports/repositories/Menu.repository";
import GetMenuUseCase from "../../../../core/usecases/menu/GetMenu.usecase";
import GetMenuBydIdUseCase from "../../../../core/usecases/menu/GetMenuById.usecase";
import UpdateMenuByIdUseCase from "../../../../core/usecases/menu/UpdateMenuById.usecase";
import MenuRepositorySQL from "../../../secondaries/mysql/repositories/MenuRepositorySQL";

export default class MenuConfig {
  public menuRepository: MenuRepository = new MenuRepositorySQL();

  public getMenuUseCase(): GetMenuUseCase {
    return new GetMenuUseCase(this.menuRepository);
  }

  public getMenuByIdUseCase(): GetMenuBydIdUseCase {
    return new GetMenuBydIdUseCase(this.menuRepository);
  }

  public updateMenuByIdUseCase(): UpdateMenuByIdUseCase {
    return new UpdateMenuByIdUseCase(this.menuRepository);
  }
}
