import { TechnicalException } from "../../exceptions/TechnicalException";
import * as Utils from "../../utils/token.service";
import TokenDomain from "../../domain/Token.domain";
import StatistiqueRepository from "../../ports/repositories/Statistique.repository";
import FindTop20BestRecipesOfTheMonthUseCase from "../../usecases/statistique/FindTop20BestRecipesOfTheMonth.usecase";
import Recipe from "../../domain/Recipe";

const initToken = (): TokenDomain => {
  const token = new TokenDomain();
  token.pseudo = "luca";

  return token;
};

describe("Find top 20 best recipes of the days use case unit tests", () => {
  let findTop20BestRecipesOfTheMonthUseCase: FindTop20BestRecipesOfTheMonthUseCase;

  let token: TokenDomain;

  let statistiqueRepository: StatistiqueRepository = ({
    findTop20BestRecipesOfTheMonth: null,
  } as unknown) as StatistiqueRepository;

  beforeEach(() => {
    token = initToken();

    findTop20BestRecipesOfTheMonthUseCase = new FindTop20BestRecipesOfTheMonthUseCase(
      statistiqueRepository
    );

    spyOn(statistiqueRepository, "findTop20BestRecipesOfTheMonth").and.callFake(
      () => {
        const result: { nomRecette: any; nbVues: any }[] = [
          {
            nomRecette: "Lasagnes",
            nbVues: 18,
          },
          {
            nomRecette: "Salade Caesar",
            nbVues: 12,
          },
        ];
        return new Promise((resolve, reject) => resolve(result));
      }
    );
  });

  it("findTop20BestRecipesOfTheMonthUseCase should return list when it succeeded", async () => {
    spyOn(Utils, "isAdmin").and.returnValue(true);
    const result: {
      nomRecette: any;
      nbVues: any;
    }[] = await findTop20BestRecipesOfTheMonthUseCase.execute(token);
    expect(result).toBeDefined();
    expect(result.length).toStrictEqual(2);
    expect(result.some(({ nbVues }) => nbVues >= 0)).toBe(true);
  });

  it("findTop20BestRecipesOfTheMonthUseCase should throw a parameter exception when the token is null", async () => {
    try {
      await findTop20BestRecipesOfTheMonthUseCase.execute(token);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous n'avez pas accès à cette ressource");
    }
  });

  it("findTop20BestRecipesOfTheMonthUseCase should throw a parameter exception when the user is not an admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      await findTop20BestRecipesOfTheMonthUseCase.execute(token);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous n'avez pas accès à cette ressource");
    }
  });
});
