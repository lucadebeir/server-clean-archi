import { TechnicalException } from "../../exceptions/TechnicalException";
import * as Utils from "../../utils/token.service";
import TokenDomain from "../../domain/Token.domain";
import StatistiqueRepository from "../../ports/repositories/Statistique.repository";
import FindNbAbonnesMonthlyUseCase from "../../usecases/statistique/FindNbAbonnesMonthly.usecase";

const initToken = (): TokenDomain => {
  const token = new TokenDomain();
  token.pseudo = "luca";

  return token;
};

describe("Find nombre abonnes monthly use case unit tests", () => {
  let findNbAbonnesMonthlyUseCase: FindNbAbonnesMonthlyUseCase;

  let token: TokenDomain;

  let statistiqueRepository: StatistiqueRepository = ({
    findNbAbonnesMonthly: null,
  } as unknown) as StatistiqueRepository;

  beforeEach(() => {
    token = initToken();

    findNbAbonnesMonthlyUseCase = new FindNbAbonnesMonthlyUseCase(
      statistiqueRepository
    );

    spyOn(statistiqueRepository, "findNbAbonnesMonthly").and.callFake(() => {
      const result: { nbAbonnes: any; month: any }[] = [
        {
          nbAbonnes: 1,
          month: 3,
        },
        {
          nbAbonnes: 2,
          month: 4,
        },
      ];
      return new Promise((resolve, reject) => resolve(result));
    });
  });

  it("findNbAbonnesMonthlyUseCase should return list when it succeeded", async () => {
    spyOn(Utils, "isAdmin").and.returnValue(true);
    const result: {
      nbAbonnes: any;
      month: any;
    }[] = await findNbAbonnesMonthlyUseCase.execute(token);
    expect(result).toBeDefined();
    expect(result.length).toStrictEqual(2);
    expect(result.some(({ nbAbonnes }) => nbAbonnes !== 0)).toBe(true);
  });

  it("findNbAbonnesMonthlyUseCase should throw a parameter exception when the token is null", async () => {
    try {
      await findNbAbonnesMonthlyUseCase.execute(token);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous n'avez pas accès à cette ressource");
    }
  });

  it("findNbAbonnesMonthlyUseCase should throw a parameter exception when the user is not an admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      await findNbAbonnesMonthlyUseCase.execute(token);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous n'avez pas accès à cette ressource");
    }
  });
});
