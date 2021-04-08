import { TechnicalException } from "../../exceptions/TechnicalException";
import * as Utils from "../../utils/token.service";
import TokenDomain from "../../domain/Token.domain";
import StatistiqueRepository from "../../ports/repositories/Statistique.repository";
import FindNbCommentairesSince30DaysUseCase from "../../usecases/statistique/FindNbCommentairesSince30Days.usecase";

const initToken = (): TokenDomain => {
  const token = new TokenDomain();
  token.pseudo = "luca";

  return token;
};

describe("Find nombre commentaires since 30 days use case unit tests", () => {
  let findNbCommentairesSince30DaysUseCase: FindNbCommentairesSince30DaysUseCase;

  let token: TokenDomain;

  let statistiqueRepository: StatistiqueRepository = ({
    findNbCommentairesSince30Days: null,
  } as unknown) as StatistiqueRepository;

  beforeEach(() => {
    token = initToken();

    findNbCommentairesSince30DaysUseCase = new FindNbCommentairesSince30DaysUseCase(
      statistiqueRepository
    );

    spyOn(statistiqueRepository, "findNbCommentairesSince30Days").and.callFake(
      () => {
        const result: { nbCommentaires: any; date: any }[] = [
          {
            nbCommentaires: 1,
            date: "2021-04-08",
          },
          {
            nbCommentaires: 2,
            date: "2021-04-10",
          },
        ];
        return new Promise((resolve, reject) => resolve(result));
      }
    );
  });

  it("findNbCommentairesSince30DaysUseCase should return list when it succeeded", async () => {
    spyOn(Utils, "isAdmin").and.returnValue(true);
    const result: {
      nbCommentaires: any;
      date: any;
    }[] = await findNbCommentairesSince30DaysUseCase.execute(token);
    expect(result).toBeDefined();
    expect(result.length).toStrictEqual(2);
    expect(result.some(({ nbCommentaires }) => nbCommentaires !== 0)).toBe(
      true
    );
  });

  it("findNbCommentairesSince30DaysUseCase should throw a parameter exception when the token is null", async () => {
    try {
      await findNbCommentairesSince30DaysUseCase.execute(token);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous n'avez pas accès à cette ressource");
    }
  });

  it("findNbCommentairesSince30DaysUseCase should throw a parameter exception when the user is not an admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      await findNbCommentairesSince30DaysUseCase.execute(token);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous n'avez pas accès à cette ressource");
    }
  });
});
