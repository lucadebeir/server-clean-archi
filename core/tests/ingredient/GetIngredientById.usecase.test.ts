import unity from "../../../adaptater/primaries/rest/endpoints/Unity";
import Ingredient from "../../domain/Ingredient";
import User from "../../domain/User";
import { BusinessException } from "../../exceptions/BusinessException";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";
import { UserRepository } from "../../ports/repositories/User.repository";
import GetIngredientByIdUseCase from "../../usecases/ingredient/GetIngredientById.usecase";

const initIngredient = (): Ingredient => {
  const ingredient = new Ingredient();
  ingredient.idIngredient = 1;
  ingredient.nomIngredient = "Cacahuètes";

  return ingredient;
};

describe("get ingredient by id use case unit tests", () => {
  let getIngredientByIdUseCase: GetIngredientByIdUseCase;

  let user: User = new User();
  let ingredient: Ingredient;

  let ingredientRepository: IngredientRepository = ({
    findById: null,
  } as unknown) as IngredientRepository;

  let userRepository: UserRepository = ({
    isAdmin: null,
  } as unknown) as UserRepository;

  beforeEach(() => {
    getIngredientByIdUseCase = new GetIngredientByIdUseCase(
      ingredientRepository,
      userRepository
    );

    ingredient = initIngredient();

    spyOn(ingredientRepository, "findById").and.callFake((id: any) => {
      if (ingredient) {
        const result: Ingredient = ingredient;
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("getUnityByIdUseCase should throw a parameter exception when the user is not admin", async () => {
    try {
      spyOn(userRepository, "isAdmin").and.returnValue(false);
      await getIngredientByIdUseCase.execute(ingredient.idIngredient, user);
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
        ingredient.idIngredient,
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
    spyOn(userRepository, "isAdmin").and.returnValue(true);
    const result: Ingredient = await getIngredientByIdUseCase.execute(
      ingredient.idIngredient,
      user
    );
    expect(result.idIngredient).toBe(1);
    expect(result.nomIngredient).toBe("Cacahuètes");
  });

  it("should throw an error when id is missing", async () => {
    try {
      spyOn(userRepository, "isAdmin").and.returnValue(true);
      await getIngredientByIdUseCase.execute(null, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'id d'un ingrédient est obligatoire");
    }
  });
});
