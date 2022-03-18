import {TechnicalException} from "../../exceptions/TechnicalException";
import * as Utils from "../../utils/token.service";
import Token from "../../domain/Token";
import StatistiqueRepository from "../../ports/repositories/Statistique.repository";
import FindNbUsersUseCase from "../../usecases/statistique/FindNbUsers.usecase";

const initToken = (): Token => {
  const token = new Token();
  token.pseudo = "luca";

  return token;
};

describe("Find nombre users use case unit tests", () => {
  let findNbUsersUseCase: FindNbUsersUseCase;

  let token: Token;

  let statistiqueRepository: StatistiqueRepository = ({
    findNbUsers: null,
  } as unknown) as StatistiqueRepository;

  beforeEach(() => {
    token = initToken();

    findNbUsersUseCase = new FindNbUsersUseCase(statistiqueRepository);

    spyOn(statistiqueRepository, "findNbUsers").and.callFake(() => {
      const result: number = 45;
      return new Promise((resolve, reject) => resolve(result));
    });
  });

  it("findNbUsersUseCase should return number when it succeeded", async () => {
    spyOn(Utils, "isAdmin").and.returnValue(true);
    const result: number = await findNbUsersUseCase.execute(token);
    expect(result).toBeDefined();
    expect(result).toStrictEqual(45);
    expect(result).toBeGreaterThanOrEqual(0);
  });

  it("findNbUsersUseCase should throw a parameter exception when the token is null", async () => {
    try {
      await findNbUsersUseCase.execute(token);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous n'avez pas accès à cette ressource");
    }
  });

  it("findNbUsersUseCase should throw a parameter exception when the user is not an admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      await findNbUsersUseCase.execute(token);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous n'avez pas accès à cette ressource");
    }
  });
});
