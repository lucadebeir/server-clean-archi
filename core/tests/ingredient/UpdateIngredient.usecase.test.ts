import Ingredient from "../../domain/Ingredient";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";
import * as Utils from "../../utils/token.service";
import UpdateIngredientUseCase from "../../usecases/ingredient/UpdateIngredient.usecase";
import Token from "../../domain/Token";

const initIngredient = (): Ingredient => {
  const ingredient = new Ingredient();
  ingredient.id = 1;
  ingredient.name = "Cacahuètes";

  return ingredient;
};

describe("Update ingredient use case unit tests", () => {
  let updateIngredientUseCase: UpdateIngredientUseCase;

  let ingredient: Ingredient;
  let user: Token = new Token();

  let ingredientRepository: IngredientRepository = ({
    update: null,
    checkExistByName: null,
    findById: null,
  } as unknown) as IngredientRepository;

  beforeEach(() => {
    ingredient = initIngredient();

    updateIngredientUseCase = new UpdateIngredientUseCase(ingredientRepository);

    spyOn(ingredientRepository, "update").and.callFake(
      (ingredient: Ingredient) => {
        if (ingredient) {
          const result: Ingredient = ingredient;
          return new Promise((resolve, reject) => resolve(result));
        }
        return new Promise((resolve, reject) => resolve(null));
      }
    );
  });

  it("updateIngredientUseCase should return ingredient when it succeeded", async () => {
    spyOn(ingredientRepository, "findById").and.returnValue(true);
    spyOn(ingredientRepository, "checkExistByName").and.returnValue(false);
    spyOn(Utils, "isAdmin").and.returnValue(true);
    const result: Ingredient = await updateIngredientUseCase.execute(
      ingredient,
      user
    );
    expect(result).toBeDefined();
    expect(result.id).toBe(1);
    expect(result.name).toBe("Cacahuètes");
  });

  it("updateIngredientUseCase should throw a parameter exception when the user is null", async () => {
    try {
      await updateIngredientUseCase.execute(ingredient, undefined);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("updateIngredientUseCase should throw a parameter exception when the user is not admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      await updateIngredientUseCase.execute(ingredient, user);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("updateIngredientUseCase should throw a parameter exception when the ingredient is null", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateIngredientUseCase.execute(undefined, user);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe("L'ingrédient est indéfinie");
    }
  });

  it("updateIngredientUseCase should throw a parameter exception when the id is null", async () => {
    ingredient.id = undefined;
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateIngredientUseCase.execute(ingredient, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "L'identifiant d'un ingrédient est obligatoire pour pouvoir le modifier"
      );
    }
  });

  it("updateIngredientUseCase should throw a parameter exception when the ingredient doesn't exist", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      spyOn(ingredientRepository, "findById").and.returnValue(false);
      await updateIngredientUseCase.execute(ingredient, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("Cet ingrédient n'existe pas");
    }
  });

  it("updateIngredientUseCase should throw a parameter exception when the name is null", async () => {
    ingredient.name = undefined;
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      spyOn(ingredientRepository, "findById").and.returnValue(true);
      await updateIngredientUseCase.execute(ingredient, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("Le nom d'un ingrédient est obligatoire");
    }
  });

  it("updateIngredientUseCase should throw a parameter exception when the name has more than 39 characters", async () => {
    ingredient.name =
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    try {
      spyOn(ingredientRepository, "checkExistByName").and.returnValue(false);
      spyOn(ingredientRepository, "findById").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateIngredientUseCase.execute(ingredient, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Le nom d'un ingrédient ne peut pas comporter plus de 39 caractères"
      );
    }
  });
});
