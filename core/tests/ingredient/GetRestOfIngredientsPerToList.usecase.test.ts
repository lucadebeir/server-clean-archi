import Ingredient from "../../domain/Ingredient";
import { BusinessException } from "../../exceptions/BusinessException";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";
import * as Utils from "../../utils/token.service";
import GetRestOfIngredientsPerToListUseCase from "../../usecases/ingredient/GetRestOfIngredientsPerToList.usecase";
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

const initRestIngredients = (): Ingredient[] => {
  const ingredient = new Ingredient();
  ingredient.id = 3;
  ingredient.name = "Orange(s)";

  const ingredient2 = new Ingredient();
  ingredient2.id = 4;
  ingredient2.name = "Kiwi";

  const ingredients = [ingredient, ingredient2];

  return ingredients;
};

describe("get rest of ingredients per to list use case unit tests", () => {
  let getRestOfIngredientsPerToListUseCase: GetRestOfIngredientsPerToListUseCase;

  let ingredients: Ingredient[];
  let restIngredients: Ingredient[];
  let user: TokenDomain = new TokenDomain();

  let ingredientRepository: IngredientRepository = ({
    findRestOfIngredientsPerToList: null,
  } as unknown) as IngredientRepository;

  beforeEach(() => {
    getRestOfIngredientsPerToListUseCase = new GetRestOfIngredientsPerToListUseCase(
      ingredientRepository
    );

    ingredients = initIngredients();
    restIngredients = initRestIngredients();

    spyOn(ingredientRepository, "findRestOfIngredientsPerToList").and.callFake(
      (ingredients: any) => {
        if (ingredients) {
          const result: Ingredient[] = restIngredients;
          return new Promise((resolve, reject) => resolve(result));
        }
        return new Promise((resolve, reject) => resolve(null));
      }
    );
  });

  it("getRestOfIngredientsPerToListUseCase should return ingredient when success", async () => {
    spyOn(Utils, "isAdmin").and.returnValue(true);
    const result: Ingredient[] = await getRestOfIngredientsPerToListUseCase.execute(
      ingredients,
      user
    );
    expect(result.length).toBe(2);
    expect(result).toHaveLength(2);
    expect(
      result.find((ingredient) => ingredient.idIngredient === 3)
    ).toBeDefined();
  });

  it("getRestOfIngredientsPerToListUseCase should throw a parameter exception when the user is not admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      await getRestOfIngredientsPerToListUseCase.execute(ingredients, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("getRestOfIngredientsPerToListUseCase should throw a parameter exception when the user is null", async () => {
    try {
      await getRestOfIngredientsPerToListUseCase.execute(
        ingredients,
        undefined
      );
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("getRestOfIngredientsPerToListUseCase should throw an error when list of ingredients is null", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await getRestOfIngredientsPerToListUseCase.execute(null, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("Une liste d'ingrédients ne peut pas être nulle");
    }
  });
});
