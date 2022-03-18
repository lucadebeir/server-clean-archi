import {TechnicalException} from "../../exceptions/TechnicalException";
import * as Utils from "../../utils/token.service";
import Token from "../../domain/Token";
import StatistiqueRepository from "../../ports/repositories/Statistique.repository";
import date from "date-and-time";
import Recipe from "../../domain/Recipe";
import FindTop20WorstRecipesUseCase from "../../usecases/statistique/FindTop20WorstRecipes.usecase";
import Etape from "../../domain/Etape";

const initToken = (): Token => {
  const token = new Token();
  token.pseudo = "luca";

  return token;
};

const initRecipes = (): Recipe[] => {
  const recipe = new Recipe();
  recipe.id = 1;
  recipe.number_views = 10;
  recipe.name = "Lasagnes";
  recipe.number_portion = 1;
  recipe.name_portion = "Bocal";
  recipe.preparation_time = date.format(new Date("00:08:00"), "hh:mm:ss");
  recipe.rest_time = date.format(new Date("00:08:00"), "hh:mm:ss");
  recipe.astuce =
    "* Vous pouvez remplacer le beurre de cacahuètes par une autre purée d'oléagineux (amandes, cajou, noisettes..).";
  recipe.mot =
    "Un granola qui conviendra parfaitement aux fan de BANANA bread !";
  recipe.steps = initSteps();

  const recipe2 = new Recipe();
  recipe2.id = 2;
  recipe2.number_views = 8;
  recipe2.name = "Salade Caesar";
  recipe2.steps = initSteps();
  recipe2.number_portion = 1;
  recipe2.name_portion = "Bocal";
  recipe2.preparation_time = date.format(new Date("00:08:00"), "hh:mm:ss");
  recipe2.rest_time = date.format(new Date("00:08:00"), "hh:mm:ss");
  recipe2.astuce =
    "* Vous pouvez remplacer le beurre de cacahuètes par une autre purée d'oléagineux (amandes, cajou, noisettes..).";
  recipe2.mot =
    "Un granola qui conviendra parfaitement aux fan de BANANA bread !";

  return [recipe, recipe2];
};

const initSteps = (): Etape[] => {
  const step = new Etape();
  step.indication = "Préchauffer le four à 180°C.";
  step.number = 1;
  step.id_recipe = 1;

  return [step];
};

describe("Find top 20 worst recipes use case unit tests", () => {
  let findTop20WorstRecipesUseCase: FindTop20WorstRecipesUseCase;

  let token: Token;
  let recipes: Recipe[];

  let statistiqueRepository: StatistiqueRepository = {
    findTop20WorstRecipes: null,
  } as unknown as StatistiqueRepository;

  beforeEach(() => {
    token = initToken();
    recipes = initRecipes();

    findTop20WorstRecipesUseCase = new FindTop20WorstRecipesUseCase(
      statistiqueRepository
    );

    spyOn(statistiqueRepository, "findTop20WorstRecipes").and.callFake(() => {
      const result: Recipe[] = recipes;
      return new Promise((resolve, reject) => resolve(result));
    });
  });

  it("findTop20WorstRecipesUseCase should return list when it succeeded", async () => {
    spyOn(Utils, "isAdmin").and.returnValue(true);
    const result: Recipe[] = await findTop20WorstRecipesUseCase.execute(token);
    expect(result).toBeDefined();
    expect(result.length).toStrictEqual(2);
    expect(
      result.some(({ number_views }) => number_views && number_views >= 0)
    ).toBe(true);
  });

  it("findTop20WorstRecipesUseCase should throw a parameter exception when the token is null", async () => {
    try {
      await findTop20WorstRecipesUseCase.execute(token);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous n'avez pas accès à cette ressource");
    }
  });

  it("findTop20WorstRecipesUseCase should throw a parameter exception when the user is not an admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      await findTop20WorstRecipesUseCase.execute(token);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous n'avez pas accès à cette ressource");
    }
  });
});
