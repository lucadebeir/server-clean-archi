import Ingredient from "../../domain/Ingredient";
import Recipe from "../../domain/Recipe";
import User from "../../domain/User";
import { BusinessException } from "../../exceptions/BusinessException";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import * as Utils from "../../utils/token.service";
import GetIngredientsNotInRecipeUseCase from "../../usecases/ingredient/GetIngredientsNotInRecipe.usecase";
import TokenDomain from "../../domain/Token.domain";

const initIngredients = (): Ingredient[] => {
  const ingredient = new Ingredient();
  ingredient.id = 1;
  ingredient.name = "Cacahuètes";

  const ingredient2 = new Ingredient();
  ingredient2.id = 2;
  ingredient2.name = "Fromage";

  const ingredients = [ingredient, ingredient2];

  return ingredients;
};

const initRecipe = (): Recipe => {
  const recipe = new Recipe();
  recipe.id = 1;

  return recipe;
};

describe("get ingredients not in recipe use case unit tests", () => {
  let getIngredientsNotInRecipeUseCase: GetIngredientsNotInRecipeUseCase;

  let ingredients: Ingredient[];
  let user: TokenDomain = new TokenDomain();
  let recipe: Recipe;

  let ingredientRepository: IngredientRepository = ({
    findIngredientsNotInRecipe: null,
  } as unknown) as IngredientRepository;

  let recipeRepository: RecipeRepository = ({
    existById: null,
  } as unknown) as RecipeRepository;

  beforeEach(() => {
    getIngredientsNotInRecipeUseCase = new GetIngredientsNotInRecipeUseCase(
      ingredientRepository,
      recipeRepository
    );

    ingredients = initIngredients();
    recipe = initRecipe();

    spyOn(ingredientRepository, "findIngredientsNotInRecipe").and.callFake(
      (id: any) => {
        if (id) {
          const result: Ingredient[] = ingredients;
          return new Promise((resolve, reject) => resolve(result));
        }
        return new Promise((resolve, reject) => resolve(null));
      }
    );
  });

  it("getIngredientsNotInRecipeUseCase should return ingredient when idRecette is 1", async () => {
    spyOn(Utils, "isAdmin").and.returnValue(true);
    spyOn(recipeRepository, "existById").and.returnValue(true);
    const result: Ingredient[] = await getIngredientsNotInRecipeUseCase.execute(
      recipe.id_recipe,
      user
    );
    expect(result.length).toBe(2);
    expect(result).toHaveLength(2);
    expect(
      result.find((ingredient) => ingredient.idIngredient === 1)
    ).toBeDefined();
  });

  it("getIngredientsNotInRecipeUseCase should throw a parameter exception when the user is not admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      await getIngredientsNotInRecipeUseCase.execute(recipe.id_recipe, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("getIngredientsNotInRecipeUseCase should throw a parameter exception when the user is null", async () => {
    try {
      await getIngredientsNotInRecipeUseCase.execute(
        recipe.id_recipe,
        undefined
      );
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("getIngredientsNotInRecipeUseCase should throw an error when idRecette is missing", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await getIngredientsNotInRecipeUseCase.execute(null, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'identifiant d'une recette est obligatoire");
    }
  });

  it("getIngredientsNotInRecipeUseCase should throw an error when recipe doesn't exist", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      spyOn(recipeRepository, "existById").and.returnValue(false);
      await getIngredientsNotInRecipeUseCase.execute(recipe.id_recipe, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "L'identifiant " +
          recipe.id_recipe +
          " ne correspond à aucune ressource existante."
      );
    }
  });
});
