import Favori from "../../domain/Favori";
import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import FavoriRepository from "../../ports/repositories/Favori.repository";
import DeleteFavoriUseCase from "../../usecases/favori/DeleteFavori.usecase";
import * as Utils from "../../utils/token.service";

const initFavori = (): Favori => {
  const favori = new Favori();
  favori.id_recipe = 1;
  favori.pseudo = "luca";

  return favori;
};

describe("Delete favori use case unit tests", () => {
  let deleteFavoriUseCase: DeleteFavoriUseCase;

  let favori: Favori;
  let token: TokenDomain = new TokenDomain();

  let favoriRepository: FavoriRepository = ({
    deleteById: null,
    check: null,
  } as unknown) as FavoriRepository;

  beforeEach(() => {
    favori = initFavori();

    deleteFavoriUseCase = new DeleteFavoriUseCase(
      favoriRepository,
    );

    spyOn(favoriRepository, "deleteById").and.callFake((favori: Favori) => {
      if (favori) {
        const result: string =
          "La recette est supprimé des favoris";
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("deleteFavoriUseCase should return message when it succeeded", async () => {
    spyOn(favoriRepository, "check").and.returnValue(true);
    spyOn(Utils, "isLogin").and.returnValue(true);
    const result: string = await deleteFavoriUseCase.execute(favori.id_recipe, favori.pseudo, token);
    expect(result).toBeDefined();
    expect(result).toBe(
      "La recette est supprimé des favoris"
    );
  });

  it("deleteFavoriUseCase should throw a parameter exception when the token is null", async () => {
    try {
      await deleteFavoriUseCase.execute(favori.id_recipe, favori.pseudo, undefined);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit de créer cette ressource"
      );
    }
  });

  it("deleteFavoriUseCase should throw a parameter exception when the token is not login", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(false);
      await deleteFavoriUseCase.execute(favori.id_recipe, favori.pseudo, token);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit de créer cette ressource"
      );
    }
  });

  it("deleteFavoriUseCase should throw a parameter exception when the favori doesn't exists", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(favoriRepository, "check").and.returnValue(false);
      await deleteFavoriUseCase.execute(favori.id_recipe, favori.pseudo, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Cette recette n'existe pas dans la liste des recettes favorites de l'utilisateur " +
          favori.pseudo
      );
    }
  });
});
