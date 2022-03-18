import Menu from "../../domain/Menu";
import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import MenuRepository from "../../ports/repositories/Menu.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import UpdateMenuByIdUseCase from "../../usecases/menu/UpdateMenuById.usecase";
import * as Utils from "../../utils/token.service";

const initMenu = (): Menu => {
  const menu = new Menu();
  //menu.map?.set(1, initRecipe());
  menu.id = 1;
  menu.id_recipe = 1;

  return menu;
};

describe("Update menu by id use case unit tests", () => {
  let updateMenuByIdUseCase: UpdateMenuByIdUseCase;

  let token: Token = new Token();
  let menu: Menu;

  let menuRepository: MenuRepository = ({
    updateById: null,
    existById: null,
  } as unknown) as MenuRepository;

  let recipeRepository: RecipeRepository = ({
    existById: null,
  } as unknown) as RecipeRepository;

  beforeEach(() => {
    menu = initMenu();

    updateMenuByIdUseCase = new UpdateMenuByIdUseCase(
      menuRepository,
      recipeRepository
    );

    spyOn(menuRepository, "updateById").and.callFake((id: any) => {
      if (id) {
        const result: string = "Modification du menu effectuée avec succès";
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("updateMenuByIdUseCase should return recipe when it succeeded", async () => {
    spyOn(menuRepository, "existById").and.returnValue(true);
    spyOn(recipeRepository, "existById").and.returnValue(true);
    spyOn(Utils, "isAdmin").and.returnValue(true);
    const result: string = await updateMenuByIdUseCase.execute(menu, token);
    expect(result).toBeDefined();
    expect(result).toStrictEqual("Modification du menu effectuée avec succès");
  });

  it("updateMenuByIdUseCase should throw a parameter exception when the token is undefined", async () => {
    try {
      await updateMenuByIdUseCase.execute(menu, undefined);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit de modifier cette ressource"
      );
    }
  });

  it("updateMenuByIdUseCase should throw a parameter exception when the user is not connect", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      await updateMenuByIdUseCase.execute(menu, token);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit de modifier cette ressource"
      );
    }
  });

  it("updateMenuByIdUseCase should throw a parameter exception when the idMenu is null", async () => {
    menu.id = undefined;
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateMenuByIdUseCase.execute(menu, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'identifiant du menu est obligatoire");
    }
  });

  it("updateMenuByIdUseCase should throw a parameter exception when the idRecette is null", async () => {
    menu.id_recipe = undefined;
    try {
      spyOn(menuRepository, "existById").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateMenuByIdUseCase.execute(menu, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'identifiant d'une recette est obligatoire");
    }
  });

  it("updateMenuByIdUseCase should throw a parameter exception when the menu doesn't exist", async () => {
    try {
      spyOn(menuRepository, "existById").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateMenuByIdUseCase.execute(menu, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "L'identifiant de menu " +
          menu.id +
          " ne correspond à aucune ressource existante"
      );
    }
  });

  it("updateMenuByIdUseCase should throw a parameter exception when the recipe doesn't exist", async () => {
    try {
      spyOn(menuRepository, "existById").and.returnValue(true);
      spyOn(recipeRepository, "existById").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateMenuByIdUseCase.execute(menu, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "L'identifiant de recette " +
          menu.id_recipe +
          " ne correspond à aucune ressource existante"
      );
    }
  });
});
