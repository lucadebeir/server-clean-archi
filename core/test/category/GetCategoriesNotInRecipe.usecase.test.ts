import Category from "../../domain/Category.domain";
import Recipe from "../../domain/Recipe";
import User from "../../domain/User";
import { BusinessException } from "../../exceptions/BusinessException";
import CategoryRepository from "../../ports/repositories/Category.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import { UserRepository } from "../../ports/repositories/User.repository";
import GetCategoriesNotInRecipeUseCase from "../../usecases/category/GetCategoriesNotInRecipe.usecase";

const initCategories = (): Category[] => {
  const category1 = new Category();
  category1.idCategorie = 1;
  category1.libelleCategorie = "Douceur";

  const category2 = new Category();
  category2.idCategorie = 2;
  category2.libelleCategorie = "Repas";

  const list = [];

  list.push(category1);
  list.push(category2);

  return list;
};

const initRecipe = (): Recipe => {
  const recipe = new Recipe();
  recipe.idRecette = 1;

  return recipe;
};

describe("Update category use case unit tests", () => {
  let getCategoriesNotInRecipeUseCase: GetCategoriesNotInRecipeUseCase;

  let list: Category[];
  let user: User = new User();
  let recipe: Recipe;

  let categoryRepository: CategoryRepository = ({
    findCategoriesNotInRecipe: null,
  } as unknown) as CategoryRepository;

  let userRepository: UserRepository = ({
    isAdmin: null,
  } as unknown) as UserRepository;

  let recipeRepository: RecipeRepository = ({
    findById: null,
  } as unknown) as RecipeRepository;

  beforeEach(() => {
    list = initCategories();
    recipe = initRecipe();

    getCategoriesNotInRecipeUseCase = new GetCategoriesNotInRecipeUseCase(
      categoryRepository,
      userRepository,
      recipeRepository
    );

    spyOn(categoryRepository, "findCategoriesNotInRecipe").and.callFake(
      (id: any) => {
        if (list) {
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
    spyOn(userRepository, "isAdmin").and.returnValue(true);
    const result: Category[] = await getCategoriesNotInRecipeUseCase.execute(
      recipe.idRecette,
      user
    );
    expect(result).toBeDefined();
    expect(result.length).toBe(2);
    expect(result).toBe(list);
  });

  it("getCategoriesNotInRecipeUseCase should throw a parameter exception when the user is not admin", async () => {
    try {
      spyOn(userRepository, "isAdmin").and.returnValue(false);
      await getCategoriesNotInRecipeUseCase.execute(recipe.idRecette, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("getCategoriesNotInRecipeUseCase should throw a parameter exception when the id is null", async () => {
    try {
      spyOn(userRepository, "isAdmin").and.returnValue(true);
      await getCategoriesNotInRecipeUseCase.execute(null, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'identifiant de la recette est indéfinie");
    }
  });

  it("getCategoriesNotInRecipeUseCase should throw a parameter exception when the recipe doesn't exist", async () => {
    try {
      spyOn(userRepository, "isAdmin").and.returnValue(true);
      await getCategoriesNotInRecipeUseCase.execute(recipe.idRecette, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("Cette recette n'existe pas");
    }
  });
});
