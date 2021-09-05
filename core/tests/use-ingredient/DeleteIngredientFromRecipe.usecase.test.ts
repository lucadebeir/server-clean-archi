import { BusinessException } from "../../exceptions/BusinessException";
import UnityRepository from "../../ports/repositories/Unity.repository";
import * as Utils from "../../utils/token.service";
import TokenDomain from "../../domain/Token.domain";
import UseIngredient from "../../domain/UseIngredient";
import UseIngredientRepository from "../../ports/repositories/UseIngredient.repository";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import DeleteIngredientFromRecipeUseCase from "../../usecases/use-ingredient/DeleteIngredientFromRecipe.usecase";

const initUseIngredient = (): UseIngredient => {
  const useIngredient = new UseIngredient();
  useIngredient.id_unit = 1;
  useIngredient.id_ingredient = 1;
  useIngredient.id_recipe = 1;
  useIngredient.quantity = 10;

  return useIngredient;
};

describe("delete ingredient from recipe use case unit tests", () => {
  let deleteIngredientFromRecipeUseCase: DeleteIngredientFromRecipeUseCase;

  let useIngredient: UseIngredient;
  let token: TokenDomain = new TokenDomain();

  let useIngredientRepository: UseIngredientRepository = ({
    delete: null,
    check: null,
  } as unknown) as UseIngredientRepository;

  let ingredientRepository: IngredientRepository = ({
    findById: null,
  } as unknown) as IngredientRepository;

  let recipeRepository: RecipeRepository = ({
    findById: null,
  } as unknown) as RecipeRepository;

  beforeEach(() => {
    useIngredient = initUseIngredient();

    deleteIngredientFromRecipeUseCase = new DeleteIngredientFromRecipeUseCase(
      useIngredientRepository,
      ingredientRepository,
      recipeRepository
    );

    spyOn(useIngredientRepository, "delete").and.callFake(
      (idRecette: number, idIngredient: number) => {
        if (idRecette && idIngredient) {
          const result: string =
            "L'ingrédient a bien été supprimé de la recette";
          return new Promise((resolve, reject) => resolve(result));
        }
        return new Promise((resolve, reject) => resolve(null));
      }
    );
  });

  it("deleteIngredientFromRecipeUseCase should return string when it succeeded", async () => {
    spyOn(ingredientRepository, "findById").and.returnValue(true);
    spyOn(recipeRepository, "findById").and.returnValue(true);
    spyOn(Utils, "isAdmin").and.returnValue(true);
    const result: string = await deleteIngredientFromRecipeUseCase.execute(
      useIngredient.id_recipe,
      useIngredient.id_ingredient,
      token
    );
    expect(result).toBeDefined();
    expect(result).toBe("L'ingrédient a bien été supprimé de la recette");
  });

  it("deleteIngredientFromRecipeUseCase should throw a parameter exception when the user is null", async () => {
    try {
      await deleteIngredientFromRecipeUseCase.execute(
        useIngredient.id_recipe,
        useIngredient.id_ingredient,
        undefined
      );
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("deleteIngredientFromRecipeUseCase should throw a parameter exception when the user is not admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      await deleteIngredientFromRecipeUseCase.execute(
        useIngredient.id_recipe,
        useIngredient.id_ingredient,
        token
      );
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("deleteIngredientFromRecipeUseCase should throw a parameter exception when the idIngredient is undefined", async () => {
    useIngredient.id_ingredient = undefined;
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await deleteIngredientFromRecipeUseCase.execute(
        useIngredient.id_recipe,
        useIngredient.id_ingredient,
        token
      );
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'ingrédient doit exister");
    }
  });

  it("deleteIngredientFromRecipeUseCase should throw a parameter exception when the idRecette is undefined", async () => {
    useIngredient.id_recipe = undefined;
    try {
      spyOn(ingredientRepository, "findById").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await deleteIngredientFromRecipeUseCase.execute(
        useIngredient.id_recipe,
        useIngredient.id_ingredient,
        token
      );
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("La recette doit exister");
    }
  });

  it("deleteIngredientFromRecipeUseCase should throw a parameter exception when the ingredient doesn't exist", async () => {
    try {
      spyOn(ingredientRepository, "findById").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await deleteIngredientFromRecipeUseCase.execute(
        useIngredient.id_recipe,
        useIngredient.id_ingredient,
        token
      );
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'ingrédient doit exister");
    }
  });

  it("deleteIngredientFromRecipeUseCase should throw a parameter exception when the recipe doesn't exist", async () => {
    try {
      spyOn(ingredientRepository, "findById").and.returnValue(true);
      spyOn(recipeRepository, "findById").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await deleteIngredientFromRecipeUseCase.execute(
        useIngredient.id_recipe,
        useIngredient.id_ingredient,
        token
      );
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("La recette doit exister");
    }
  });
});
