import {TechnicalException} from "../../exceptions/TechnicalException";
import * as Utils from "../../utils/token.service";
import Token from "../../domain/Token";
import StatistiqueRepository from "../../ports/repositories/Statistique.repository";
import FindNbViewsSince30DaysUseCase from "../../usecases/statistique/FindNbViewsSince30Days.usecase";

const initToken = (): Token => {
  const token = new Token();
  token.pseudo = "luca";

  return token;
};

describe("Find nombre views since 30 days use case unit tests", () => {
  let findNbViewsSince30DaysUseCase: FindNbViewsSince30DaysUseCase;

  let token: Token;

  let statistiqueRepository: StatistiqueRepository = {
    findNbViewsSince30Days: null,
  } as unknown as StatistiqueRepository;

  beforeEach(() => {
    token = initToken();

    findNbViewsSince30DaysUseCase = new FindNbViewsSince30DaysUseCase(
      statistiqueRepository
    );

    spyOn(statistiqueRepository, "findNbViewsSince30Days").and.callFake(() => {
      const result: { number_views: any; date: any }[] = [
        {
          number_views: 1,
          date: "2021-04-08",
        },
        {
          number_views: 2,
          date: "2021-04-10",
        },
      ];
      return new Promise((resolve, reject) => resolve(result));
    });
  });

  it("findNbViewsSince30DaysUseCase should return list when it succeeded", async () => {
    spyOn(Utils, "isAdmin").and.returnValue(true);
    const result: {
      number_views: any;
      date: any;
    }[] = await findNbViewsSince30DaysUseCase.execute(token);
    expect(result).toBeDefined();
    expect(result.length).toStrictEqual(2);
    expect(result.some(({ number_views }) => number_views !== 0)).toBe(true);
  });

  it("findNbViewsSince30DaysUseCase should throw a parameter exception when the token is null", async () => {
    try {
      await findNbViewsSince30DaysUseCase.execute(token);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous n'avez pas accès à cette ressource");
    }
  });

  it("findNbViewsSince30DaysUseCase should throw a parameter exception when the user is not an admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      await findNbViewsSince30DaysUseCase.execute(token);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous n'avez pas accès à cette ressource");
    }
  });
});
