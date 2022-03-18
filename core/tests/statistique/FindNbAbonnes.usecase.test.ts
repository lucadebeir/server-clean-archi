import {TechnicalException} from "../../exceptions/TechnicalException";
import * as Utils from "../../utils/token.service";
import Token from "../../domain/Token";
import FindNbAbonnesUseCase from "../../usecases/statistique/FindNbAbonnes.usecase";
import StatistiqueRepository from "../../ports/repositories/Statistique.repository";

const initToken = (): Token => {
  const token = new Token();
  token.pseudo = "luca";

  return token;
};

describe("Find nombre abonnes use case unit tests", () => {
  let findNbAbonnesUseCase: FindNbAbonnesUseCase;

  let token: Token;

  let statistiqueRepository: StatistiqueRepository = ({
    findNbAbonnes: null,
  } as unknown) as StatistiqueRepository;

  beforeEach(() => {
    token = initToken();

    findNbAbonnesUseCase = new FindNbAbonnesUseCase(statistiqueRepository);

    spyOn(statistiqueRepository, "findNbAbonnes").and.callFake(() => {
      const result: number = 45;
      return new Promise((resolve, reject) => resolve(result));
    });
  });

  it("findNbAbonnesUseCase should return number when it succeeded", async () => {
    spyOn(Utils, "isAdmin").and.returnValue(true);
    const result: number = await findNbAbonnesUseCase.execute(token);
    expect(result).toBeDefined();
    expect(result).toStrictEqual(45);
    expect(result).toBeGreaterThanOrEqual(0);
  });

  it("findNbAbonnesUseCase should throw a parameter exception when the token is null", async () => {
    try {
      await findNbAbonnesUseCase.execute(token);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous n'avez pas accès à cette ressource");
    }
  });

  it("findNbAbonnesUseCase should throw a parameter exception when the user is not an admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      await findNbAbonnesUseCase.execute(token);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous n'avez pas accès à cette ressource");
    }
  });
});
