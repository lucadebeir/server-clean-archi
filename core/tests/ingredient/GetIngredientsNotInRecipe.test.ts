import Ingredient from "../../domain/Ingredient";
import Recipe from "../../domain/Recipe";
import User from "../../domain/User";
import { BusinessException } from "../../exceptions/BusinessException";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import { UserRepository } from "../../ports/repositories/User.repository";
import GetIngredientsNotInRecipeUseCase from "../../usecases/ingredient/GetIngredientsNotInRecipe.usecase";

const initIngredients = (): Ingredient[] => {
  const ingredient = new Ingredient();
  ingredient.idIngredient = 1;
  ingredient.nomIngredient = "Cacahuètes";

  const ingredient2 = new Ingredient();
  ingredient2.idIngredient = 2;
  ingredient2.nomIngredient = "Fromage";

  const ingredients = [ingredient, ingredient2];

  return ingredients;
};

const initRecipe = (): Recipe => {
  const recipe = new Recipe();
  recipe.idRecette = 1;

  return recipe;
}

describe("get ingredients not in recipe use case unit tests", () => {
  let getIngredientsNotInRecipeUseCase: GetIngredientsNotInRecipeUseCase;

  let ingredients: Ingredient[];
  let user: User = new User();
  let recipe: Recipe;

  let ingredientRepository: IngredientRepository = ({
    findIngredientsNotInRecipe: null,
  } as unknown) as IngredientRepository;

  let userRepository: UserRepository = ({
    isAdmin: null,
  } as unknown) as UserRepository;

  let recipeRepository: RecipeRepository = ({
    existById: null,
  } as unknown) as RecipeRepository;

  beforeEach(() => {
    getIngredientsNotInRecipeUseCase = new GetIngredientsNotInRecipeUseCase(
      ingredientRepository,
      userRepository,
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
    spyOn(userRepository, "isAdmin").and.returnValue(true);
    spyOn(recipeRepository, "existById").and.returnValue(true);
    const result: Ingredient[] = await getIngredientsNotInRecipeUseCase.execute(
      recipe.idRecette,
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
      spyOn(userRepository, "isAdmin").and.returnValue(false);
      await getIngredientsNotInRecipeUseCase.execute(recipe.idRecette, user);
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
        recipe.idRecette,
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
      spyOn(userRepository, "isAdmin").and.returnValue(true);
      await getIngredientsNotInRecipeUseCase.execute(null, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'identifiant d'une recette est obligatoire");
    }
  });

  it("getIngredientsNotInRecipeUseCase should throw an error when recipe doesn't exist", async () => {
    try {
      spyOn(userRepository, "isAdmin").and.returnValue(true);
    spyOn(recipeRepository, "existById").and.returnValue(false);
      await getIngredientsNotInRecipeUseCase.execute(recipe.idRecette, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'identifiant " + recipe.idRecette + " ne correspond à aucune ressource existante.");
    }
  });
});
