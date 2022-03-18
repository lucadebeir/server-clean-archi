import Recipe from "../../domain/Recipe";
import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import DeleteRecipeUseCase from "../../usecases/recipe/DeleteRecipe.usecase";
import * as Utils from "../../utils/token.service";

const initRecipe = (): Recipe => {
  const recipe = new Recipe();
  recipe.id = 1;
  recipe.name = "Lasagnes";

  return recipe;
};

describe("Delete recipe use case unit tests", () => {
  let deleteRecipeUseCase: DeleteRecipeUseCase;

  let recipe: Recipe;
  let user: Token = new Token();

  let recipeRepository: RecipeRepository = {
    deleteById: null,
    useInMenu: null,
    useInRecipeList: null,
    existById: null,
  } as unknown as RecipeRepository;

  beforeEach(() => {
    recipe = initRecipe();

    deleteRecipeUseCase = new DeleteRecipeUseCase(recipeRepository);

    spyOn(recipeRepository, "deleteById").and.callFake((id: any) => {
      if (id) {
        const result: string = "La recette a bien été supprimé";
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("deleteRecipeUseCase should return message when it succeeded", async () => {
    spyOn(Utils, "isAdmin").and.returnValue(true);
    spyOn(recipeRepository, "existById").and.returnValue(true);
    spyOn(recipeRepository, "useInMenu").and.returnValue(false);
    spyOn(recipeRepository, "useInRecipeList").and.returnValue(false);

    const result: string = await deleteRecipeUseCase.execute(recipe.id, user);
    expect(result).toBeDefined();
    expect(result).toBe("La recette a bien été supprimé");
  });

  it("deleteRecipeUseCase should throw a parameter exception when the user is undefined", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValues(false);
      await deleteRecipeUseCase.execute(recipe.id, undefined);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("deleteRecipeUseCase should throw a parameter exception when the user is not admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValues(false);
      await deleteRecipeUseCase.execute(recipe.id, user);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("deleteRecipeUseCase should throw a parameter exception when the id is null", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValues(true);
      await deleteRecipeUseCase.execute(undefined, user);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe("L'identifiant d'une recette est indéfini");
    }
  });

  it("deleteRecipeUseCase should throw a parameter exception when the recipe doesn't exist", async () => {
    try {
      spyOn(recipeRepository, "existById").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await deleteRecipeUseCase.execute(recipe.id, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("Cette recette n'existe pas");
    }
  });

  it("deleteRecipeUseCase should throw a parameter exception when the recipe is used in menu", async () => {
    try {
      spyOn(recipeRepository, "existById").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      spyOn(recipeRepository, "useInMenu").and.returnValue(true);
      await deleteRecipeUseCase.execute(recipe.id, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "La recette " +
          recipe.id +
          " ne peut pas être supprimée car cette dernière est utilisée par le menu."
      );
    }
  });

  it("deleteRecipeUseCase should throw a parameter exception when the recipe is used in a recipe list", async () => {
    try {
      spyOn(recipeRepository, "existById").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      spyOn(recipeRepository, "useInMenu").and.returnValue(false);
      spyOn(recipeRepository, "useInRecipeList").and.returnValue(true);
      await deleteRecipeUseCase.execute(recipe.id, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "La recette " +
          recipe.id +
          " ne peut pas être supprimée car cette dernière est utilisée par un menu de la semaine."
      );
    }
  });
});
