import { BusinessException } from "../../exceptions/BusinessException";
import UnityRepository from "../../ports/repositories/Unity.repository";
import * as Utils from "../../utils/token.service";
import TokenDomain from "../../domain/Token.domain";
import UseIngredient from "../../domain/UseIngredient";
import UseIngredientRepository from "../../ports/repositories/UseIngredient.repository";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import UpdateIngredientFromRecipeUseCase from "../../usecases/use-ingredient/UpdateIngredientFromRecipe.usecase";

const initUseIngredient = (): UseIngredient => {
  const useIngredient = new UseIngredient();
  useIngredient.idUnite = 1;
  useIngredient.idIngredient = 1;
  useIngredient.idRecette = 1;
  useIngredient.qte = 10;

  return useIngredient;
};

describe("update ingredient from recipe use case unit tests", () => {
  let updateIngredientFromRecipeUseCase: UpdateIngredientFromRecipeUseCase;

  let useIngredient: UseIngredient;
  let token: TokenDomain = new TokenDomain();

  let useIngredientRepository: UseIngredientRepository = ({
    update: null,
    check: null,
  } as unknown) as UseIngredientRepository;

  let unityRepository: UnityRepository = ({
    findById: null,
  } as unknown) as UnityRepository;

  let ingredientRepository: IngredientRepository = ({
    findById: null,
  } as unknown) as IngredientRepository;

  let recipeRepository: RecipeRepository = ({
    findById: null,
  } as unknown) as RecipeRepository;

  beforeEach(() => {
    useIngredient = initUseIngredient();

    updateIngredientFromRecipeUseCase = new UpdateIngredientFromRecipeUseCase(
      useIngredientRepository,
      unityRepository,
      ingredientRepository,
      recipeRepository
    );

    spyOn(useIngredientRepository, "update").and.callFake(
      (useIngredient: UseIngredient) => {
        if (useIngredient) {
          const result: string = "L'ingrédient a bien été modifié";
          return new Promise((resolve, reject) => resolve(result));
        }
        return new Promise((resolve, reject) => resolve(null));
      }
    );
  });

  it("updateIngredientFromRecipeUseCase should return unity when it succeeded", async () => {
    spyOn(unityRepository, "findById").and.returnValue(true);
    spyOn(ingredientRepository, "findById").and.returnValue(true);
    spyOn(recipeRepository, "findById").and.returnValue(true);
    spyOn(Utils, "isAdmin").and.returnValue(true);
    spyOn(useIngredientRepository, "check").and.returnValue(false);
    const result: string = await updateIngredientFromRecipeUseCase.execute(
      useIngredient,
      token
    );
    expect(result).toBeDefined();
    expect(result).toBe("L'ingrédient a bien été modifié");
  });

  it("updateIngredientFromRecipeUseCase should throw a parameter exception when the user is null", async () => {
    try {
      await updateIngredientFromRecipeUseCase.execute(useIngredient, undefined);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("updateIngredientFromRecipeUseCase should throw a parameter exception when the user is not admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      await updateIngredientFromRecipeUseCase.execute(useIngredient, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("updateIngredientFromRecipeUseCase should throw a parameter exception when the idUnity is undefined", async () => {
    useIngredient.idUnite = undefined;
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateIngredientFromRecipeUseCase.execute(useIngredient, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'unité doit exister");
    }
  });

  it("updateIngredientFromRecipeUseCase should throw a parameter exception when the idIngredient is undefined", async () => {
    useIngredient.idIngredient = undefined;
    try {
      spyOn(unityRepository, "findById").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateIngredientFromRecipeUseCase.execute(useIngredient, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'ingrédient doit exister");
    }
  });

  it("updateIngredientFromRecipeUseCase should throw a parameter exception when the idRecette is undefined", async () => {
    useIngredient.idRecette = undefined;
    try {
      spyOn(unityRepository, "findById").and.returnValue(true);
      spyOn(ingredientRepository, "findById").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateIngredientFromRecipeUseCase.execute(useIngredient, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("La recette doit exister");
    }
  });

  it("updateIngredientFromRecipeUseCase should throw a parameter exception when the unity doesn't exist", async () => {
    try {
      spyOn(unityRepository, "findById").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateIngredientFromRecipeUseCase.execute(useIngredient, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'unité doit exister");
    }
  });

  it("updateIngredientFromRecipeUseCase should throw a parameter exception when the ingredient doesn't exist", async () => {
    try {
      spyOn(unityRepository, "findById").and.returnValue(true);
      spyOn(ingredientRepository, "findById").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateIngredientFromRecipeUseCase.execute(useIngredient, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'ingrédient doit exister");
    }
  });

  it("updateIngredientFromRecipeUseCase should throw a parameter exception when the recipe doesn't exist", async () => {
    try {
      spyOn(unityRepository, "findById").and.returnValue(true);
      spyOn(ingredientRepository, "findById").and.returnValue(true);
      spyOn(recipeRepository, "findById").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateIngredientFromRecipeUseCase.execute(useIngredient, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("La recette doit exister");
    }
  });

  it("updateIngredientFromRecipeUseCase should throw a parameter exception when the qte is undefined", async () => {
    useIngredient.qte = undefined;
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      spyOn(unityRepository, "findById").and.returnValue(true);
      spyOn(ingredientRepository, "findById").and.returnValue(true);
      spyOn(recipeRepository, "findById").and.returnValue(true);
      await updateIngredientFromRecipeUseCase.execute(useIngredient, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("La quantité est obligatoire");
    }
  });

  it("updateIngredientFromRecipeUseCase should throw a parameter exception when the qte is equal to 0", async () => {
    useIngredient.qte = 0;
    try {
      spyOn(unityRepository, "findById").and.returnValue(true);
      spyOn(ingredientRepository, "findById").and.returnValue(true);
      spyOn(recipeRepository, "findById").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateIngredientFromRecipeUseCase.execute(useIngredient, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Une quantité ne peut pas être négative, ni nulle"
      );
    }
  });

  it("updateIngredientFromRecipeUseCase should throw a parameter exception when ingredient already exist on this recipe", async () => {
    try {
      spyOn(unityRepository, "findById").and.returnValue(true);
      spyOn(ingredientRepository, "findById").and.returnValue(true);
      spyOn(recipeRepository, "findById").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      spyOn(useIngredientRepository, "check").and.returnValue(true);
      await updateIngredientFromRecipeUseCase.execute(useIngredient, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("Cette ingrédient existe déjà dans cette recette");
    }
  });
});
