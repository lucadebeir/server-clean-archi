import Favori from "../../domain/Favori";
import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import FavoriRepository from "../../ports/repositories/Favori.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import CreateFavoriUseCase from "../../usecases/favori/CreateFavori.usecase";
import * as Utils from "../../utils/token.service";

const initFavori = (): Favori => {
  const favori = new Favori();
  favori.id_recipe = 1;
  favori.pseudo = "luca";

  return favori;
};

describe("Create favori use case unit tests", () => {
  let createFavoriUseCase: CreateFavoriUseCase;

  let favori: Favori;
  let token: TokenDomain = new TokenDomain();

  let favoriRepository: FavoriRepository = ({
    create: null,
    check: null,
  } as unknown) as FavoriRepository;

  let recipeRepository: RecipeRepository = ({
    existById: null,
  } as unknown) as RecipeRepository;

  beforeEach(() => {
    favori = initFavori();

    createFavoriUseCase = new CreateFavoriUseCase(
      favoriRepository,
      recipeRepository
    );

    spyOn(favoriRepository, "create").and.callFake((favori: Favori) => {
      if (favori) {
        const result: string =
          "La recette est bien ajoutée aux favoris de l'utilisateur";
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("createFavoriUseCase should return message when it succeeded", async () => {
    spyOn(favoriRepository, "check").and.returnValue(false);
    spyOn(Utils, "isLogin").and.returnValue(true);
    spyOn(recipeRepository, "existById").and.returnValue(true);
    const result: string = await createFavoriUseCase.execute(favori, token);
    expect(result).toBeDefined();
    expect(result).toBe(
      "La recette est bien ajoutée aux favoris de l'utilisateur"
    );
  });

  it("updateCategoryUseCase should throw a parameter exception when the token is null", async () => {
    try {
      await createFavoriUseCase.execute(favori, undefined);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit de créer cette ressource"
      );
    }
  });

  it("updateCategoryUseCase should throw a parameter exception when the token is not login", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(false);
      await createFavoriUseCase.execute(favori, token);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit de créer cette ressource"
      );
    }
  });

  it("createFavoriUseCase should throw a parameter exception when the recipe doesn't exist", async () => {
    try {
      spyOn(recipeRepository, "existById").and.returnValue(false);
      spyOn(Utils, "isLogin").and.returnValue(true);
      await createFavoriUseCase.execute(favori, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("La recette doit exister");
    }
  });

  it("createFavoriUseCase should throw a parameter exception when the favori already exists", async () => {
    try {
      spyOn(recipeRepository, "existById").and.returnValue(true);
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(favoriRepository, "check").and.returnValue(true);
      await createFavoriUseCase.execute(favori, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Cette recette se trouve déjà dans la liste des recettes favorites de l'utilisateur " +
          favori.pseudo
      );
    }
  });
});
