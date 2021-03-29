import Category from "../../domain/Category.domain";
import Recipe from "../../domain/Recipe";
import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import CategoryRepository from "../../ports/repositories/Category.repository";
import * as Utils from "../../utils/token.service";
import GetRecipesByIdCategoryUseCase from "../../usecases/category/GetRecipesByIdCategory.usecase";

const initCategories = (): Category => {
  const category = new Category();
  category.idCategorie = 1;
  category.libelleCategorie = "Douceur";

  return category;
};

const initRecipe = (): Recipe[] => {
  const recipe = new Recipe();
  recipe.idRecette = 1;
  recipe.datePublication = new Date("2020-04-14 19:55:22");

  const recipe2 = new Recipe();
  recipe2.idRecette = 2;
  recipe.datePublication = new Date("2020-04-16 14:24:57");

  const list = [recipe, recipe2];

  return list;
};

describe("Get recipes by id category use case unit tests", () => {
  let getRecipesByIdCategoryUseCase: GetRecipesByIdCategoryUseCase;

  let category: Category;
  let user: TokenDomain = new TokenDomain();
  let recipes: Recipe[];

  let categoryRepository: CategoryRepository = ({
    getRecipesByIdCategory: null,
    existById: null,
  } as unknown) as CategoryRepository;

  beforeEach(() => {
    category = initCategories();
    recipes = initRecipe();

    getRecipesByIdCategoryUseCase = new GetRecipesByIdCategoryUseCase(
      categoryRepository
    );

    spyOn(categoryRepository, "getRecipesByIdCategory").and.callFake(
      (id: any) => {
        if (id) {
          const result: Recipe[] = recipes;
          return new Promise((resolve, reject) => resolve(result));
        }
        return new Promise((resolve, reject) => resolve(null));
      }
    );
  });

  it("getRecipesByIdCategoryUseCase should return categories when it succeeded", async () => {
    spyOn(Utils, "isAdmin").and.returnValue(true);
    spyOn(categoryRepository, "existById").and.returnValue(true);
    const result: Recipe[] = await getRecipesByIdCategoryUseCase.execute(
      category.idCategorie,
      user
    );
    expect(result).toBeDefined();
    expect(result.length).toBe(2);
    //attendre la nouvelle dépendance pour typescript
    //expect(result).toBeSortedBy("datePublication");
    expect(result).toBe(recipes);
  });

  it("getRecipesByIdCategoryUseCase should throw a parameter exception when the user is not admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      spyOn(categoryRepository, "existById").and.returnValue(true);
      await getRecipesByIdCategoryUseCase.execute(category.idCategorie, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("getRecipesByIdCategoryUseCase should throw a parameter exception when the id is null", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      spyOn(categoryRepository, "existById").and.returnValue(true);
      await getRecipesByIdCategoryUseCase.execute(null, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'identifiant de la catégorie est indéfinie");
    }
  });

  it("getRecipesByIdCategoryUseCase should throw a parameter exception when the category doesn't exist", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      spyOn(categoryRepository, "existById").and.returnValue(true);
      await getRecipesByIdCategoryUseCase.execute(category.idCategorie, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("Cette recette n'existe pas");
    }
  });
});
