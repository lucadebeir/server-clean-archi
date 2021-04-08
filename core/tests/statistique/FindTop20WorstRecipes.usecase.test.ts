import { TechnicalException } from "../../exceptions/TechnicalException";
import * as Utils from "../../utils/token.service";
import TokenDomain from "../../domain/Token.domain";
import StatistiqueRepository from "../../ports/repositories/Statistique.repository";
import date from "date-and-time";
import Recipe from "../../domain/Recipe";
import FindTop20WorstRecipesUseCase from "../../usecases/statistique/FindTop20WorstRecipes.usecase";

const initToken = (): TokenDomain => {
  const token = new TokenDomain();
  token.pseudo = "luca";

  return token;
};

const initRecipes = (): Recipe[] => {
  const recipe = new Recipe();
  recipe.idRecette = 1;
  recipe.nbVues = 10;
  recipe.nomRecette = "Lasagnes";
  recipe.etapes = "1. Préchauffer le four à 180°C.";
  recipe.nbrePart = 1;
  recipe.libellePart = "Bocal";
  recipe.tempsPreparation = date.format(new Date("00:08:00"), "hh:mm:ss");
  recipe.tempsCuisson = date.format(new Date("00:08:00"), "hh:mm:ss");
  recipe.astuce =
    "* Vous pouvez remplacer le beurre de cacahuètes par une autre purée d'oléagineux (amandes, cajou, noisettes..).";
  recipe.mot =
    "Un granola qui conviendra parfaitement aux fan de BANANA bread !";

  const recipe2 = new Recipe();
  recipe2.idRecette = 2;
  recipe2.nbVues = 8;
  recipe2.nomRecette = "Salade Caesar";
  recipe2.etapes = "1. Préchauffer le four à 180°C.";
  recipe2.nbrePart = 1;
  recipe2.libellePart = "Bocal";
  recipe2.tempsPreparation = date.format(new Date("00:08:00"), "hh:mm:ss");
  recipe2.tempsCuisson = date.format(new Date("00:08:00"), "hh:mm:ss");
  recipe2.astuce =
    "* Vous pouvez remplacer le beurre de cacahuètes par une autre purée d'oléagineux (amandes, cajou, noisettes..).";
  recipe2.mot =
    "Un granola qui conviendra parfaitement aux fan de BANANA bread !";

  return [recipe, recipe2];
};

describe("Find top 20 worst recipes use case unit tests", () => {
  let findTop20WorstRecipesUseCase: FindTop20WorstRecipesUseCase;

  let token: TokenDomain;
  let recipes: Recipe[];

  let statistiqueRepository: StatistiqueRepository = ({
    findTop20WorstRecipes: null,
  } as unknown) as StatistiqueRepository;

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
    expect(result.some(({ nbVues }) => nbVues && nbVues >= 0)).toBe(true);
  });

  it("findTop20WorstRecipesUseCase should throw a parameter exception when the token is null", async () => {
    try {
      await findTop20WorstRecipesUseCase.execute(token);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous n'avez pas accès à cette ressource");
    }
  });

  it("findTop20WorstRecipesUseCase should throw a parameter exception when the user is not an admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      await findTop20WorstRecipesUseCase.execute(token);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous n'avez pas accès à cette ressource");
    }
  });
});
