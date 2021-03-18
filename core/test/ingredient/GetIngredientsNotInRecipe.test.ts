import Ingredient from "../../domain/Ingredient";
import { BusinessException } from "../../exceptions/BusinessException";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";
import GetIngredientsNotInRecipeUseCase from "../../usecases/ingredient/GetIngredientsNotInRecipe.usecase";

describe("get ingredients not in recipe use case unit tests", () => {
  let getIngredientsNotInRecipeUseCase: GetIngredientsNotInRecipeUseCase;

  let ingredientRepository: IngredientRepository = ({
    findIngredientsNotInRecipe: null,
  } as unknown) as IngredientRepository;

  beforeEach(() => {
    getIngredientsNotInRecipeUseCase = new GetIngredientsNotInRecipeUseCase(
      ingredientRepository
    );

    spyOn(ingredientRepository, "findIngredientsNotInRecipe").and.callFake(
      (id: any) => {
        if (id === 1) {
          return [
            {
              idIngredient: 1,
              nomIngredient: "Cacahuètes",
            },
            {
              idIngredient: 2,
              nomIngredient: "Lait",
            },
          ] as Ingredient[];
        }
        return null;
      }
    );
  });

  it("getIngredientsNotInRecipeUseCase should return ingredient when idRecette is 1", async () => {
    const result: Ingredient[] = await getIngredientsNotInRecipeUseCase.execute(
      1
    );
    expect(result.length).toBe(2);
    expect(result).toHaveLength(2);
    expect(
      result.find((ingredient) => ingredient.idIngredient === 1)
    ).toBeDefined();
  });

  it("should throw an error when idRecette is missing", async () => {
    try {
      await getIngredientsNotInRecipeUseCase.execute(null);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'id d'une recette est obligatoire");
    }
  });
});
