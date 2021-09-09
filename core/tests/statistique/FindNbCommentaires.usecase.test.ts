import { TechnicalException } from "../../exceptions/TechnicalException";
import * as Utils from "../../utils/token.service";
import TokenDomain from "../../domain/Token.domain";
import StatistiqueRepository from "../../ports/repositories/Statistique.repository";
import FindNbCommentairesUseCase from "../../usecases/statistique/FindNbCommentaires.usecase";

const initToken = (): TokenDomain => {
  const token = new TokenDomain();
  token.pseudo = "luca";

  return token;
};

describe("Find nombre commentaires use case unit tests", () => {
  let findNbCommentairesUseCase: FindNbCommentairesUseCase;

  let token: TokenDomain;

  let statistiqueRepository: StatistiqueRepository = ({
    findNbCommentaires: null,
  } as unknown) as StatistiqueRepository;

  beforeEach(() => {
    token = initToken();

    findNbCommentairesUseCase = new FindNbCommentairesUseCase(
      statistiqueRepository
    );

    spyOn(statistiqueRepository, "findNbCommentaires").and.callFake(() => {
      const result: number = 45;
      return new Promise((resolve, reject) => resolve(result));
    });
  });

  it("findNbCommentairesUseCase should return number when it succeeded", async () => {
    spyOn(Utils, "isAdmin").and.returnValue(true);
    const result: number = await findNbCommentairesUseCase.execute(token);
    expect(result).toBeDefined();
    expect(result).toStrictEqual(45);
    expect(result).toBeGreaterThanOrEqual(0);
  });

  it("findNbCommentairesUseCase should throw a parameter exception when the token is null", async () => {
    try {
      await findNbCommentairesUseCase.execute(token);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous n'avez pas accès à cette ressource");
    }
  });

  it("findNbCommentairesUseCase should throw a parameter exception when the user is not an admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      await findNbCommentairesUseCase.execute(token);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous n'avez pas accès à cette ressource");
    }
  });
});
