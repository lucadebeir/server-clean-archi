import Recipe from "../../domain/Recipe";
import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import GetRecipeByIdUseCase from "../../usecases/recipe/GetRecipeById.usecase";
import * as Utils from "../../utils/token.service";

const initRecipe = (): Recipe => {
  const recipe = new Recipe();
  recipe.id = 1;
  recipe.name = "Lasagnes";

  return recipe;
};

describe("Get recipe by id use case unit tests", () => {
  let getRecipeByIdUseCase: GetRecipeByIdUseCase;

  let recipe: Recipe;
  let user: TokenDomain = new TokenDomain();

  let recipeRepository: RecipeRepository = {
    findById: null,
    existById: null,
  } as unknown as RecipeRepository;

  beforeEach(() => {
    recipe = initRecipe();

    getRecipeByIdUseCase = new GetRecipeByIdUseCase(recipeRepository);

    spyOn(recipeRepository, "findById").and.callFake((id: any) => {
      if (id) {
        const result: Recipe = recipe;
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("getRecipeByIdUseCase should return recipe when it succeeded", async () => {
    spyOn(recipeRepository, "existById").and.returnValue(true);
    const result: Recipe = await getRecipeByIdUseCase.execute(recipe.id);
    expect(result).toBeDefined();
    expect(result.id).toBe(1);
    expect(result.name).toBe("Lasagnes");
  });

  it("getRecipeByIdUseCase should throw a parameter exception when the id is null", async () => {
    try {
      await getRecipeByIdUseCase.execute(undefined);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe("L'identifiant d'une recette est obligatoire");
    }
  });

  it("getRecipeByIdUseCase should throw a parameter exception when the recipe doesn't exist", async () => {
    try {
      spyOn(recipeRepository, "existById").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await getRecipeByIdUseCase.execute(recipe.id);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("Cette recette n'existe pas");
    }
  });
});
