import Category from "../../domain/Category";
import Recipe from "../../domain/Recipe";
import {BusinessException} from "../../exceptions/BusinessException";
import CategoryRepository from "../../ports/repositories/Category.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import * as Utils from "../../utils/token.service";
import GetCategoriesNotInRecipeUseCase from "../../usecases/category/GetCategoriesNotInRecipe.usecase";
import Token from "../../domain/Token";

const initCategories = (): Category[] => {
  const category1 = new Category();
  category1.id = 1;
  category1.name = "Douceur";

  const category2 = new Category();
  category2.id = 2;
  category2.name = "Repas";

  return [category1, category2];
};

const initRecipe = (): Recipe => {
  const recipe = new Recipe();
  recipe.id = 1;

  return recipe;
};

describe("Get categories not in recipe use case unit tests", () => {
  let getCategoriesNotInRecipeUseCase: GetCategoriesNotInRecipeUseCase;

  let list: Category[];
  let user: Token = new Token();
  let recipe: Recipe;

  let categoryRepository: CategoryRepository = {
    findCategoriesNotInRecipe: null,
  } as unknown as CategoryRepository;

  let recipeRepository: RecipeRepository = {
    findById: null,
  } as unknown as RecipeRepository;

  beforeEach(() => {
    list = initCategories();
    recipe = initRecipe();

    getCategoriesNotInRecipeUseCase = new GetCategoriesNotInRecipeUseCase(
      categoryRepository,
      recipeRepository
    );

    spyOn(categoryRepository, "findCategoriesNotInRecipe").and.callFake(
      (id: any) => {
        if (id) {
          const result: Category[] = list;
          return new Promise((resolve, reject) => resolve(result));
        }
        return new Promise((resolve, reject) => resolve(null));
      }
    );

    spyOn(recipeRepository, "findById").and.callFake((id: any) => {
      if (recipe) {
        const result: Recipe = recipe;
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("getCategoriesNotInRecipeUseCase should return categories when it succeeded", async () => {
    spyOn(Utils, "isAdmin").and.returnValue(true);
    const result: Category[] = await getCategoriesNotInRecipeUseCase.execute(
      recipe.id,
      user
    );
    expect(result).toBeDefined();
    expect(result.length).toBe(2);
    expect(result).toBe(list);
  });

  it("getCategoriesNotInRecipeUseCase should throw a parameter exception when the user is not admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      await getCategoriesNotInRecipeUseCase.execute(recipe.id, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("getCategoriesNotInRecipeUseCase should throw a parameter exception when the id is null", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await getCategoriesNotInRecipeUseCase.execute(null, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'identifiant de la recette est indéfinie");
    }
  });

  it("getCategoriesNotInRecipeUseCase should throw a parameter exception when the recipe doesn't exist", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await getCategoriesNotInRecipeUseCase.execute(recipe.id, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("Cette recette n'existe pas");
    }
  });
});
