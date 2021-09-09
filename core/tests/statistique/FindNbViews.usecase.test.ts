import { TechnicalException } from "../../exceptions/TechnicalException";
import * as Utils from "../../utils/token.service";
import TokenDomain from "../../domain/Token.domain";
import StatistiqueRepository from "../../ports/repositories/Statistique.repository";
import FindNbViewsUseCase from "../../usecases/statistique/FindNbViews.usecase";

const initToken = (): TokenDomain => {
  const token = new TokenDomain();
  token.pseudo = "luca";

  return token;
};

describe("Find nombre views use case unit tests", () => {
  let findNbViewsUseCase: FindNbViewsUseCase;

  let token: TokenDomain;

  let statistiqueRepository: StatistiqueRepository = ({
    findNbViews: null,
  } as unknown) as StatistiqueRepository;

  beforeEach(() => {
    token = initToken();

    findNbViewsUseCase = new FindNbViewsUseCase(statistiqueRepository);

    spyOn(statistiqueRepository, "findNbViews").and.callFake(() => {
      const result: number = 45;
      return new Promise((resolve, reject) => resolve(result));
    });
  });

  it("findNbViewsUseCase should return number when it succeeded", async () => {
    spyOn(Utils, "isAdmin").and.returnValue(true);
    const result: number = await findNbViewsUseCase.execute(token);
    expect(result).toBeDefined();
    expect(result).toStrictEqual(45);
    expect(result).toBeGreaterThanOrEqual(0);
  });

  it("findNbViewsUseCase should throw a parameter exception when the token is null", async () => {
    try {
      await findNbViewsUseCase.execute(token);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous n'avez pas accès à cette ressource");
    }
  });

  it("findNbViewsUseCase should throw a parameter exception when the user is not an admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      await findNbViewsUseCase.execute(token);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous n'avez pas accès à cette ressource");
    }
  });
});
