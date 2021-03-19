import MenuRepository from "../../../../core/ports/repositories/Menu.repository";
import GetMenuUseCase from "../../../../core/usecases/menu/GetMenu.usecase";
import MenuRepositorySQL from "../../../secondaries/mysql/repositories/MenuRepositorySQL";

export default class MenuConfig {
    public ingredientRepository: MenuRepository = new MenuRepositorySQL();

    public getMenuUseCase(): GetMenuUseCase {
        return new GetMenuUseCase(this.ingredientRepository);
    }
}
  