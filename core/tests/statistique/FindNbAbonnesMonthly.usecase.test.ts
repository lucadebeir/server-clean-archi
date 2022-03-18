import {TechnicalException} from "../../exceptions/TechnicalException";
import * as Utils from "../../utils/token.service";
import Token from "../../domain/Token";
import StatistiqueRepository from "../../ports/repositories/Statistique.repository";
import FindNbAbonnesMonthlyUseCase from "../../usecases/statistique/FindNbAbonnesMonthly.usecase";

const initToken = (): Token => {
  const token = new Token();
  token.pseudo = "luca";

  return token;
};

describe("Find nombre abonnes monthly use case unit tests", () => {
  let findNbAbonnesMonthlyUseCase: FindNbAbonnesMonthlyUseCase;

  let token: Token;

  let statistiqueRepository: StatistiqueRepository = {
    findNbAbonnesMonthly: null,
  } as unknown as StatistiqueRepository;

  beforeEach(() => {
    token = initToken();

    findNbAbonnesMonthlyUseCase = new FindNbAbonnesMonthlyUseCase(
      statistiqueRepository
    );

    spyOn(statistiqueRepository, "findNbAbonnesMonthly").and.callFake(() => {
      const result: { number_subscribed: any; month: any }[] = [
        {
          number_subscribed: 1,
          month: 3,
        },
        {
          number_subscribed: 2,
          month: 4,
        },
      ];
      return new Promise((resolve, reject) => resolve(result));
    });
  });

  it("findNbAbonnesMonthlyUseCase should return list when it succeeded", async () => {
    spyOn(Utils, "isAdmin").and.returnValue(true);
    const result: {
      number_subscribed: any;
      month: any;
    }[] = await findNbAbonnesMonthlyUseCase.execute(token);
    expect(result).toBeDefined();
    expect(result.length).toStrictEqual(2);
    expect(
      result.some(({ number_subscribed }) => number_subscribed !== 0)
    ).toBe(true);
  });

  it("findNbAbonnesMonthlyUseCase should throw a parameter exception when the token is null", async () => {
    try {
      await findNbAbonnesMonthlyUseCase.execute(token);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous n'avez pas accès à cette ressource");
    }
  });

  it("findNbAbonnesMonthlyUseCase should throw a parameter exception when the user is not an admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      await findNbAbonnesMonthlyUseCase.execute(token);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous n'avez pas accès à cette ressource");
    }
  });
});
