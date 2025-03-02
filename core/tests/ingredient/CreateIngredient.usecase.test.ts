import Ingredient from "../../domain/Ingredient";
import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";
import * as Utils from "../../utils/token.service";
import CreateIngredientUseCase from "../../usecases/ingredient/CreateIngredient.usecase";

const initIngredient = (): Ingredient => {
  const ingredient = new Ingredient();
  ingredient.name = "Cacahuètes";

  return ingredient;
};

describe("Create ingredient use case unit tests", () => {
  let createIngredientUseCase: CreateIngredientUseCase;

  let ingredient: Ingredient;
  let user: Token = new Token();

  let ingredientRepository: IngredientRepository = ({
    create: null,
    checkExistByName: null,
  } as unknown) as IngredientRepository;

  beforeEach(() => {
    ingredient = initIngredient();

    createIngredientUseCase = new CreateIngredientUseCase(ingredientRepository);

    spyOn(ingredientRepository, "create").and.callFake(
      (ingredient: Ingredient) => {
        if (ingredient) {
          const result: Ingredient = { ...ingredient, id: 1 };
          return new Promise((resolve, reject) => resolve(result));
        }
        return new Promise((resolve, reject) => resolve(null));
      }
    );
  });

  it("createIngredientUseCase should return ingredient when it succeeded", async () => {
    spyOn(ingredientRepository, "checkExistByName").and.returnValue(false);
    spyOn(Utils, "isAdmin").and.returnValue(true);
    const result: Ingredient = await createIngredientUseCase.execute(
      ingredient,
      user
    );
    expect(result).toBeDefined();
    expect(result.id).toBe(1);
    expect(result.name).toBe("Cacahuètes");
  });

  it("createIngredientUseCase should throw a parameter exception when the user is null", async () => {
    try {
      await createIngredientUseCase.execute(ingredient, undefined);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("createIngredientUseCase should throw a parameter exception when the user is not admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      await createIngredientUseCase.execute(ingredient, user);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("createIngredientUseCase should throw a parameter exception when the ingredient is null", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await createIngredientUseCase.execute(undefined, user);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe("L'ingrédient est indéfinie");
    }
  });

  it("createIngredientUseCase should throw a parameter exception when the name is null", async () => {
    ingredient.name = undefined;
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await createIngredientUseCase.execute(ingredient, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("Le nom d'un ingrédient est obligatoire");
    }
  });

  it("createIngredientUseCase should throw a parameter exception when the name has more than 39 characters", async () => {
    ingredient.name =
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    try {
      spyOn(ingredientRepository, "checkExistByName").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await createIngredientUseCase.execute(ingredient, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Le nom d'un ingrédient ne peut pas comporter plus de 39 caractères"
      );
    }
  });

  it("createIngredientUseCase should throw a parameter exception when the libelleUnity already exists", async () => {
    try {
      spyOn(ingredientRepository, "checkExistByName").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await createIngredientUseCase.execute(ingredient, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("Ce nom est déjà utilisé par un ingrédient");
    }
  });
});
