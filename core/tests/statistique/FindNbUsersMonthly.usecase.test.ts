import {TechnicalException} from "../../exceptions/TechnicalException";
import * as Utils from "../../utils/token.service";
import Token from "../../domain/Token";
import StatistiqueRepository from "../../ports/repositories/Statistique.repository";
import FindNbUsersMonthlyUseCase from "../../usecases/statistique/FindNbUsersMonthly.usecase";

const initToken = (): Token => {
  const token = new Token();
  token.pseudo = "luca";

  return token;
};

describe("Find nombre users monthly use case unit tests", () => {
  let findNbUsersMonthlyUseCase: FindNbUsersMonthlyUseCase;

  let token: Token;

  let statistiqueRepository: StatistiqueRepository = {
    findNbUsersMonthly: null,
  } as unknown as StatistiqueRepository;

  beforeEach(() => {
    token = initToken();

    findNbUsersMonthlyUseCase = new FindNbUsersMonthlyUseCase(
      statistiqueRepository
    );

    spyOn(statistiqueRepository, "findNbUsersMonthly").and.callFake(() => {
      const result: { number_users: any; month: any }[] = [
        {
          number_users: 1,
          month: 3,
        },
        {
          number_users: 2,
          month: 4,
        },
      ];
      return new Promise((resolve, reject) => resolve(result));
    });
  });

  it("findNbUsersMonthlyUseCase should return list when it succeeded", async () => {
    spyOn(Utils, "isAdmin").and.returnValue(true);
    const result: {
      number_users: any;
      month: any;
    }[] = await findNbUsersMonthlyUseCase.execute(token);
    expect(result).toBeDefined();
    expect(result.length).toStrictEqual(2);
    expect(result.some(({ number_users }) => number_users !== 0)).toBe(true);
  });

  it("findNbUsersMonthlyUseCase should throw a parameter exception when the token is null", async () => {
    try {
      await findNbUsersMonthlyUseCase.execute(token);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous n'avez pas accès à cette ressource");
    }
  });

  it("findNbUsersMonthlyUseCase should throw a parameter exception when the user is not an admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      await findNbUsersMonthlyUseCase.execute(token);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous n'avez pas accès à cette ressource");
    }
  });
});
