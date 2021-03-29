import Ingredient from "../../domain/Ingredient";
import { BusinessException } from "../../exceptions/BusinessException";
import * as Utils from "../../utils/token.service";
import TokenDomain from "../../domain/Token.domain";
import GetAllIngredientsUseCase from "../../usecases/ingredient/GetAllIngredients.usecase";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";

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

describe("Get all ingredients use case unit tests", () => {
  let getAllIngredientsUseCase: GetAllIngredientsUseCase;

  let list: Ingredient[];
  let user: TokenDomain = new TokenDomain();

  let ingredientRepository: IngredientRepository = ({
    findAll: null,
  } as unknown) as IngredientRepository;

  beforeEach(() => {
    list = initIngredients();

    getAllIngredientsUseCase = new GetAllIngredientsUseCase(
      ingredientRepository
    );

    spyOn(ingredientRepository, "findAll").and.callFake(() => {
      const result: Ingredient[] = list;
      return new Promise((resolve, reject) => resolve(result));
    });
  });

  it("getAllIngredientsUseCase should return ingredients when it succeeded", async () => {
    spyOn(Utils, "isAdmin").and.returnValue(true);
    const result: Ingredient[] = await getAllIngredientsUseCase.execute(user);
    expect(result).toBeDefined();
    expect(result.length).toBe(2);
    expect(result).toBe(list);
  });

  it("getAllIngredientsUseCase should throw a parameter exception when the user is not admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      await getAllIngredientsUseCase.execute(user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("getAllIngredientsUseCase should throw a parameter exception when the user is null", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      await getAllIngredientsUseCase.execute(undefined);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });
});
