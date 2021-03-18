import Ingredient from "../../domain/Ingredient";
import { BusinessException } from "../../exceptions/BusinessException";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";
import GetIngredientByIdUseCase from "../../usecases/ingredient/GetIngredientById.usecase";

describe("get ingredient by id use case unit tests", () => {
  let getIngredientByIdUseCase: GetIngredientByIdUseCase;

  let ingredientRepository: IngredientRepository = ({
    findById: null,
  } as unknown) as IngredientRepository;

  beforeEach(() => {
    getIngredientByIdUseCase = new GetIngredientByIdUseCase(
      ingredientRepository
    );

    spyOn(ingredientRepository, "findById").and.callFake((id: any) => {
      if (id === 1) {
        return {
          idIngredient: 1,
          nomIngredient: "Cacahuètes",
        } as Ingredient;
      }
      return null;
    });
  });

  it("getIngredientByIdUseCase should return ingredient when idIngredient is 1", async () => {
    const result: Ingredient = await getIngredientByIdUseCase.execute(1);
    expect(result.idIngredient).toBe(1);
    expect(result.nomIngredient).toBe("Cacahuètes");
  });

  it("should throw an error when id is missing", async () => {
    try {
      await getIngredientByIdUseCase.execute(null);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'id d'un ingrédient est obligatoire");
    }
  });
});
