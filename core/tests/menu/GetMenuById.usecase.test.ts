import recipe from "../../../adaptater/primaries/rest/endpoints/Recipe";
import Menu from "../../domain/Menu";
import Recipe from "../../domain/Recipe";
import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import MenuRepository from "../../ports/repositories/Menu.repository";
import GetMenuBydIdUseCase from "../../usecases/menu/GetMenuById.usecase";
import * as Utils from "../../utils/token.service";

const initRecipe = (): Recipe => {
  const recipe = new Recipe();
  recipe.idRecette = 1;
  recipe.nomRecette = "Lasagnes";

  return recipe;
};

const initMenu = (): Menu => {
    const menu = new Menu();
    menu.douceur = initRecipe();

    return menu;
}

describe("Get menu by id use case unit tests", () => {
  let getMenuBydIdUseCase: GetMenuBydIdUseCase;

  let recipe: Recipe;
  let token: TokenDomain = new TokenDomain();
  let menu: Menu;

  let menuRepository: MenuRepository = ({
    findById: null,
    existById: null
  } as unknown) as MenuRepository;

  beforeEach(() => {
    recipe = initRecipe();
    menu = initMenu();

    getMenuBydIdUseCase = new GetMenuBydIdUseCase(menuRepository);

    spyOn(menuRepository, "findById").and.callFake((id: any) => {
      if (id) {
        const result: Recipe = recipe;
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("getMenuBydIdUseCase should return recipe when it succeeded", async () => {
    spyOn(menuRepository, "existById").and.returnValue(true);
    const result: Recipe = await getMenuBydIdUseCase.execute(3, token);
    spyOn(Utils, "isAdmin").and.returnValue(true);
    expect(result).toBeDefined();
    expect(result.idRecette).toBe(1);
    expect(result.nomRecette).toBe("Lasagnes");
  });

  it("getMenuBydIdUseCase should throw a parameter exception when the token is undefined", async () => {
    try {
      await getMenuBydIdUseCase.execute(3, undefined);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous n'avez pas le droit d'accéder à cette ressource");
    }
  });

  it("getMenuBydIdUseCase should throw a parameter exception when the user is not an admin", async () => {
    try {
        spyOn(Utils, "isAdmin").and.returnValue(false);
      await getMenuBydIdUseCase.execute(3, undefined);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous n'avez pas le droit d'accéder à cette ressource");
    }
  });

  it("getMenuBydIdUseCase should throw a parameter exception when the id is null", async () => {
    try {
      await getMenuBydIdUseCase.execute(undefined, token);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe("L'identifiant d'une recette du menu est obligatoire");
    }
  });

  it("getMenuBydIdUseCase should throw a parameter exception when the menu doesn't exist", async () => {
    try {
      spyOn(menuRepository, "existById").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await getMenuBydIdUseCase.execute(3, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'identifiant 3 ne correspond à aucune ressource existante");
    }
  });
});
