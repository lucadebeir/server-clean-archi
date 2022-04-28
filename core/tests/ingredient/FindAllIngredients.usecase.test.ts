import Ingredient from "../../domain/Ingredient";
import {BusinessException} from "../../exceptions/BusinessException";
import * as Utils from "../../utils/token.service";
import Token from "../../domain/Token";
import FindAllIngredientsUsecase from "../../usecases/ingredient/FindAllIngredients.usecase";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";

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

describe("Get all ingredients use case unit tests", () => {
  let getAllIngredientsUseCase: FindAllIngredientsUsecase;

  let list: Ingredient[];
  let user: Token = new Token();

  let ingredientRepository: IngredientRepository = {
    findAll: null,
  } as unknown as IngredientRepository;

  beforeEach(() => {
    list = initIngredients();

    getAllIngredientsUseCase = new FindAllIngredientsUsecase(
      ingredientRepository
    );

    spyOn(ingredientRepository, "findAll").and.callFake(() => {
      const result: Ingredient[] = list;
      return new Promise((resolve, reject) => resolve(result));
    });
  });

  it("getAllIngredientsUseCase should return ingredients when it succeeded", async () => {
    spyOn(Utils, "isLogin").and.returnValue(true);
    const result: Ingredient[] = await getAllIngredientsUseCase.execute(user);
    expect(result).toBeDefined();
    expect(result.length).toBe(2);
    expect(result).toBe(list);
  });

  it("getAllIngredientsUseCase should throw a parameter exception when the user is not connected", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(false);
      await getAllIngredientsUseCase.execute(user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("getAllIngredientsUseCase should throw a parameter exception when the user is null", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(false);
      await getAllIngredientsUseCase.execute(undefined);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });
});
