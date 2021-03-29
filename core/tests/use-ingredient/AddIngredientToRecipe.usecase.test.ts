import { BusinessException } from "../../exceptions/BusinessException";
import UnityRepository from "../../ports/repositories/Unity.repository";
import * as Utils from "../../utils/token.service";
import TokenDomain from "../../domain/Token.domain";
import UseIngredient from "../../domain/UseIngredient";
import UseIngredientRepository from "../../ports/repositories/UseIngredient.repository";
import AddIngredientToRecipeUseCase from "../../usecases/use-ingredient/AddIngredientToRecipe.usecase";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";

const initUseIngredient = (): UseIngredient => {
  const useIngredient = new UseIngredient();
  useIngredient.idUnite = 1;
  useIngredient.idIngredient = 1;
  useIngredient.idRecette = 1;
  useIngredient.qte = 10;

  return useIngredient;
};

describe("Add ingredient to recipe use case unit tests", () => {
  let addIngredientToRecipeUseCase: AddIngredientToRecipeUseCase;

  let useIngredient: UseIngredient;
  let token: TokenDomain = new TokenDomain();

  let useIngredientRepository: UseIngredientRepository = ({
    addIngredientToRecipe: null,
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

    addIngredientToRecipeUseCase = new AddIngredientToRecipeUseCase(
      useIngredientRepository,
      unityRepository,
      ingredientRepository,
      recipeRepository
    );

    spyOn(useIngredientRepository, "addIngredientToRecipe").and.callFake(
      (useIngredient: UseIngredient) => {
        if (useIngredient) {
          const result: string = "L'ingrédient a bien été ajouté à la recette";
          return new Promise((resolve, reject) => resolve(result));
        }
        return new Promise((resolve, reject) => resolve(null));
      }
    );
  });

  it("addIngredientToRecipeUseCase should return string when it succeeded", async () => {
    spyOn(unityRepository, "findById").and.returnValue(true);
    spyOn(ingredientRepository, "findById").and.returnValue(true);
    spyOn(recipeRepository, "findById").and.returnValue(true);
    spyOn(Utils, "isAdmin").and.returnValue(true);
    spyOn(useIngredientRepository, "check").and.returnValue(false);
    const result: string = await addIngredientToRecipeUseCase.execute(
      useIngredient,
      token
    );
    expect(result).toBeDefined();
    expect(result).toBe("L'ingrédient a bien été ajouté à la recette");
  });

  it("addIngredientToRecipeUseCase should throw a parameter exception when the user is null", async () => {
    try {
      await addIngredientToRecipeUseCase.execute(useIngredient, undefined);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("addIngredientToRecipeUseCase should throw a parameter exception when the user is not admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      await addIngredientToRecipeUseCase.execute(useIngredient, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("addIngredientToRecipeUseCase should throw a parameter exception when the idUnity is undefined", async () => {
    useIngredient.idUnite = undefined;
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await addIngredientToRecipeUseCase.execute(useIngredient, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'unité doit exister");
    }
  });

  it("addIngredientToRecipeUseCase should throw a parameter exception when the idIngredient is undefined", async () => {
    useIngredient.idIngredient = undefined;
    try {
      spyOn(unityRepository, "findById").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await addIngredientToRecipeUseCase.execute(useIngredient, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'ingrédient doit exister");
    }
  });

  it("addIngredientToRecipeUseCase should throw a parameter exception when the idRecette is undefined", async () => {
    useIngredient.idRecette = undefined;
    try {
      spyOn(unityRepository, "findById").and.returnValue(true);
      spyOn(ingredientRepository, "findById").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await addIngredientToRecipeUseCase.execute(useIngredient, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("La recette doit exister");
    }
  });

  it("addIngredientToRecipeUseCase should throw a parameter exception when the unity doesn't exist", async () => {
    try {
      spyOn(unityRepository, "findById").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await addIngredientToRecipeUseCase.execute(useIngredient, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'unité doit exister");
    }
  });

  it("addIngredientToRecipeUseCase should throw a parameter exception when the ingredient doesn't exist", async () => {
    try {
      spyOn(unityRepository, "findById").and.returnValue(true);
      spyOn(ingredientRepository, "findById").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await addIngredientToRecipeUseCase.execute(useIngredient, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'ingrédient doit exister");
    }
  });

  it("addIngredientToRecipeUseCase should throw a parameter exception when the recipe doesn't exist", async () => {
    try {
      spyOn(unityRepository, "findById").and.returnValue(true);
      spyOn(ingredientRepository, "findById").and.returnValue(true);
      spyOn(recipeRepository, "findById").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await addIngredientToRecipeUseCase.execute(useIngredient, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("La recette doit exister");
    }
  });

  it("addIngredientToRecipeUseCase should throw a parameter exception when the qte is undefined", async () => {
    useIngredient.qte = undefined;
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      spyOn(unityRepository, "findById").and.returnValue(true);
      spyOn(ingredientRepository, "findById").and.returnValue(true);
      spyOn(recipeRepository, "findById").and.returnValue(true);
      await addIngredientToRecipeUseCase.execute(useIngredient, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("La quantité est obligatoire");
    }
  });

  it("addIngredientToRecipeUseCase should throw a parameter exception when the qte is equal to 0", async () => {
    useIngredient.qte = 0;
    try {
      spyOn(unityRepository, "findById").and.returnValue(true);
      spyOn(ingredientRepository, "findById").and.returnValue(true);
      spyOn(recipeRepository, "findById").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await addIngredientToRecipeUseCase.execute(useIngredient, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Une quantité ne peut pas être négative, ni nulle"
      );
    }
  });

  it("addIngredientToRecipeUseCase should throw a parameter exception when ingredient already exist on this recipe", async () => {
    try {
      spyOn(unityRepository, "findById").and.returnValue(true);
      spyOn(ingredientRepository, "findById").and.returnValue(true);
      spyOn(recipeRepository, "findById").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      spyOn(useIngredientRepository, "check").and.returnValue(true);
      await addIngredientToRecipeUseCase.execute(useIngredient, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("Cette ingrédient existe déjà dans cette recette");
    }
  });
});
