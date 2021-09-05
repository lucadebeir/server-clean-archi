import Ingredient from "../../domain/Ingredient";
import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";
import * as Utils from "../../utils/token.service";
import GetIngredientByIdUseCase from "../../usecases/ingredient/GetIngredientById.usecase";

const initIngredient = (): Ingredient => {
  const ingredient = new Ingredient();
  ingredient.id = 1;
  ingredient.name = "Cacahuètes";

  return ingredient;
};

describe("get ingredient by id use case unit tests", () => {
  let getIngredientByIdUseCase: GetIngredientByIdUseCase;

  let user: TokenDomain = new TokenDomain();
  let ingredient: Ingredient;

  let ingredientRepository: IngredientRepository = ({
    findById: null,
  } as unknown) as IngredientRepository;

  beforeEach(() => {
    getIngredientByIdUseCase = new GetIngredientByIdUseCase(
      ingredientRepository
    );

    ingredient = initIngredient();

    spyOn(ingredientRepository, "findById").and.callFake((id: any) => {
      if (id) {
        const result: Ingredient = ingredient;
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("getUnityByIdUseCase should throw a parameter exception when the user is not admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      await getIngredientByIdUseCase.execute(ingredient.id, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("getUnityByIdUseCase should throw a parameter exception when the user is null", async () => {
    try {
      await getIngredientByIdUseCase.execute(
        ingredient.id,
        undefined
      );
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("getIngredientByIdUseCase should return ingredient when idIngredient is 1", async () => {
    spyOn(Utils, "isAdmin").and.returnValue(true);
    const result: Ingredient = await getIngredientByIdUseCase.execute(
      ingredient.id,
      user
    );
    expect(result.id).toBe(1);
    expect(result.name).toBe("Cacahuètes");
  });

  it("should throw an error when id is missing", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await getIngredientByIdUseCase.execute(null, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'id d'un ingrédient est obligatoire");
    }
  });
});
