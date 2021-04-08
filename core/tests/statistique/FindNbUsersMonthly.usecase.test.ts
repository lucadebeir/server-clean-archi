import { TechnicalException } from "../../exceptions/TechnicalException";
import * as Utils from "../../utils/token.service";
import TokenDomain from "../../domain/Token.domain";
import StatistiqueRepository from "../../ports/repositories/Statistique.repository";
import FindNbUsersMonthlyUseCase from "../../usecases/statistique/FindNbUsersMonthly.usecase";

const initToken = (): TokenDomain => {
  const token = new TokenDomain();
  token.pseudo = "luca";

  return token;
};

describe("Find nombre users monthly use case unit tests", () => {
  let findNbUsersMonthlyUseCase: FindNbUsersMonthlyUseCase;

  let token: TokenDomain;

  let statistiqueRepository: StatistiqueRepository = ({
    findNbUsersMonthly: null,
  } as unknown) as StatistiqueRepository;

  beforeEach(() => {
    token = initToken();

    findNbUsersMonthlyUseCase = new FindNbUsersMonthlyUseCase(
      statistiqueRepository
    );

    spyOn(statistiqueRepository, "findNbUsersMonthly").and.callFake(() => {
      const result: { nbUsers: any; month: any }[] = [
        {
          nbUsers: 1,
          month: 3,
        },
        {
          nbUsers: 2,
          month: 4,
        },
      ];
      return new Promise((resolve, reject) => resolve(result));
    });
  });

  it("findNbUsersMonthlyUseCase should return list when it succeeded", async () => {
    spyOn(Utils, "isAdmin").and.returnValue(true);
    const result: {
      nbUsers: any;
      month: any;
    }[] = await findNbUsersMonthlyUseCase.execute(token);
    expect(result).toBeDefined();
    expect(result.length).toStrictEqual(2);
    expect(result.some(({ nbUsers }) => nbUsers !== 0)).toBe(true);
  });

  it("findNbUsersMonthlyUseCase should throw a parameter exception when the token is null", async () => {
    try {
      await findNbUsersMonthlyUseCase.execute(token);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous n'avez pas accès à cette ressource");
    }
  });

  it("findNbUsersMonthlyUseCase should throw a parameter exception when the user is not an admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      await findNbUsersMonthlyUseCase.execute(token);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous n'avez pas accès à cette ressource");
    }
  });
});
