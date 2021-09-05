import Ingredient from "../../domain/Ingredient";
import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";
import DeleteIngredientUseCase from "../../usecases/ingredient/DeleteIngredient.usecase";
import * as Utils from "../../utils/token.service";

const initIngredient = (): Ingredient => {
  const ingredient = new Ingredient();
  ingredient.id = 1;
  ingredient.name = "Cacahuètes";

  return ingredient;
};

describe("Delete ingredient use case unit tests", () => {
  let deleteIngredientUseCase: DeleteIngredientUseCase;

  let ingredient: Ingredient;
  let user: TokenDomain = new TokenDomain();

  let ingredientRepository: IngredientRepository = ({
    deleteById: null,
    checkExistInRecipes: null,
    existById: null,
  } as unknown) as IngredientRepository;

  beforeEach(() => {
    ingredient = initIngredient();

    deleteIngredientUseCase = new DeleteIngredientUseCase(ingredientRepository);

    spyOn(ingredientRepository, "deleteById").and.returnValue(
      "L'ingrédient a bien été supprimé"
    );
  });

  it("deleteIngredientUseCase should return message when it succeeded", async () => {
    spyOn(ingredientRepository, "checkExistInRecipes").and.returnValue(false);
    spyOn(Utils, "isAdmin").and.returnValue(true);
    spyOn(ingredientRepository, "existById").and.returnValue(true);
    const result: string = await deleteIngredientUseCase.execute(
      ingredient.id,
      user
    );
    expect(result).toBeDefined();
    expect(result).toBe("L'ingrédient a bien été supprimé");
  });

  it("deleteIngredientUseCase should throw a parameter exception when the user is not admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValues(false);
      await deleteIngredientUseCase.execute(ingredient.id, user);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("deleteIngredientUseCase should throw a parameter exception when the user is null", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValues(false);
      await deleteIngredientUseCase.execute(ingredient.id, undefined);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("deleteIngredientUseCase should throw a parameter exception when the id is null", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValues(true);
      await deleteIngredientUseCase.execute(null, user);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe("L'identifiant d'un ingrédient est indéfini");
    }
  });

  it("deleteIngredientUseCase should throw a parameter exception when the ingredient doesn't exist", async () => {
    try {
      spyOn(ingredientRepository, "existById").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await deleteIngredientUseCase.execute(ingredient.id, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("Cet ingrédient n'existe pas");
    }
  });

  it("deleteIngredientUseCase should throw a parameter exception when the ingredient is used in a recipe", async () => {
    try {
      spyOn(ingredientRepository, "checkExistInRecipes").and.returnValue(true);
      spyOn(ingredientRepository, "existById").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await deleteIngredientUseCase.execute(ingredient.id, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Cet ingrédient est associé à une ou plusieurs recettes"
      );
    }
  });
});
