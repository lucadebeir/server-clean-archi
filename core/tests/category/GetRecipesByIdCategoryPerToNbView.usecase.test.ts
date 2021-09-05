import Category from "../../domain/Category.domain";
import Recipe from "../../domain/Recipe";
import { BusinessException } from "../../exceptions/BusinessException";
import CategoryRepository from "../../ports/repositories/Category.repository";
import * as Utils from "../../utils/token.service";
import GetRecipesByIdCategoryPerToNbViewUseCase from "../../usecases/category/GetRecipesByIdCategoryPerToNbView.usecase";
import TokenDomain from "../../domain/Token.domain";

const initCategories = (): Category => {
  const category = new Category();
  category.id = 1;
  category.libelleCategorie = "Douceur";

  return category;
};

const initRecipe = (): Recipe[] => {
  const recipe = new Recipe();
  recipe.id = 1;
  recipe.number_views = 140;

  const recipe2 = new Recipe();
  recipe2.id = 2;
  recipe2.number_views = 1;

  const list = [recipe, recipe2];

  return list;
};

describe("Get Recipes by id category use case unit tests", () => {
  let getRecipesByIdCategoryPerToNbViewUseCase: GetRecipesByIdCategoryPerToNbViewUseCase;

  let category: Category;
  let user: TokenDomain = new TokenDomain();
  let recipes: Recipe[];

  let categoryRepository: CategoryRepository = ({
    getRecipesByIdCategoryPerToNbView: null,
    existById: null,
  } as unknown) as CategoryRepository;

  beforeEach(() => {
    category = initCategories();
    recipes = initRecipe();

    getRecipesByIdCategoryPerToNbViewUseCase = new GetRecipesByIdCategoryPerToNbViewUseCase(
      categoryRepository
    );

    spyOn(categoryRepository, "getRecipesByIdCategoryPerToNbView").and.callFake(
      (id: any) => {
        if (id) {
          const result: Recipe[] = recipes;
          return new Promise((resolve, reject) => resolve(result));
        }
        return new Promise((resolve, reject) => resolve(null));
      }
    );
  });

  it("getRecipesByIdCategoryPerToNbViewUseCase should return categories when it succeeded", async () => {
    spyOn(Utils, "isAdmin").and.returnValue(true);
    spyOn(categoryRepository, "existById").and.returnValue(true);
    const result: Recipe[] = await getRecipesByIdCategoryPerToNbViewUseCase.execute(
      category.id,
      user
    );
    expect(result).toBeDefined();
    expect(result.length).toBe(2);
    expect(result).toBe(recipes);
    //attendre la nouvelle dépendance pour typescript
    //expect(result).toBeSortedBy("nbVues");
  });

  it("getRecipesByIdCategoryPerToNbViewUseCase should throw a parameter exception when the user is not admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      spyOn(categoryRepository, "existById").and.returnValue(true);
      await getRecipesByIdCategoryPerToNbViewUseCase.execute(
        category.id,
        user
      );
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("getRecipesByIdCategoryPerToNbViewUseCase should throw a parameter exception when the id is null", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      spyOn(categoryRepository, "existById").and.returnValue(true);
      await getRecipesByIdCategoryPerToNbViewUseCase.execute(null, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'identifiant de la catégorie est indéfinie");
    }
  });

  it("getRecipesByIdCategoryPerToNbViewUseCase should throw a parameter exception when the category doesn't exist", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      spyOn(categoryRepository, "existById").and.returnValue(true);
      await getRecipesByIdCategoryPerToNbViewUseCase.execute(
        category.id,
        user
      );
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("Cette recette n'existe pas");
    }
  });
});
