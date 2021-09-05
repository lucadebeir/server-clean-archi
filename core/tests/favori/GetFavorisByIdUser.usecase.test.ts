import Favori from "../../domain/Favori";
import TokenDomain from "../../domain/Token.domain";
import User from "../../domain/User";
import { TechnicalException } from "../../exceptions/TechnicalException";
import FavoriRepository from "../../ports/repositories/Favori.repository";
import GetFavorisByIdUserUseCase from "../../usecases/favori/GetFavorisByIdUser.usecase";
import * as Utils from "../../utils/token.service";

const initFavori = (): Favori[] => {
  const favori = new Favori();
  favori.id_recipe = 1;
  favori.pseudo = "luca";

  const favori2 = new Favori();
  favori2.id_recipe = 2;
  favori2.pseudo = "luca";

  const list: Favori[] = [favori, favori2];

  return list;
};

const initToken = (): TokenDomain => {
    const token = new TokenDomain();
    token.pseudo = "luca";

    return token;
}

const initUser = (): User => {
    const user = new User();
    user.pseudo = "luca";

    return user;
}

describe("Get favoris by id user use case unit tests", () => {
  let getFavorisByIdUserUseCase: GetFavorisByIdUserUseCase;

  let favoris: Favori[];
  let token: TokenDomain;
  let user: User;

  let favoriRepository: FavoriRepository = ({
    findByIdUser: null,
  } as unknown) as FavoriRepository;

  beforeEach(() => {
    favoris = initFavori();
    token = initToken();
    user = initUser();

    getFavorisByIdUserUseCase = new GetFavorisByIdUserUseCase(
      favoriRepository,
    );

    spyOn(favoriRepository, "findByIdUser").and.callFake((id: any) => {
      if (id) {
        const result: Favori[] = favoris;
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("getFavorisByIdUserUseCase should return message when it succeeded", async () => {
    spyOn(Utils, "isLogin").and.returnValue(true);
    const result: Favori[] = await getFavorisByIdUserUseCase.execute(user.pseudo, token);
    expect(result).toBeDefined();
    expect(result.length).toBe(2);
    expect(result).toHaveLength(2);
    expect(result.map(favori => {
        expect(favori.pseudo).toEqual(token.pseudo);
    }))
  });

  it("getFavorisByIdUserUseCase should throw a parameter exception when the token is null", async () => {
    try {
      await getFavorisByIdUserUseCase.execute(user.pseudo, undefined);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit de créer cette ressource"
      );
    }
  });

  it("getFavorisByIdUserUseCase should throw a parameter exception when the token is not login", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(false);
      await getFavorisByIdUserUseCase.execute(user.pseudo, token);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit de créer cette ressource"
      );
    }
  });

  it("getFavorisByIdUserUseCase should throw a parameter exception when the token don't correspond to pseudo", async () => {
      user.pseudo = "lucas";
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      await getFavorisByIdUserUseCase.execute(user.pseudo, token);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Problème technique"
      );
    }
  });
});
