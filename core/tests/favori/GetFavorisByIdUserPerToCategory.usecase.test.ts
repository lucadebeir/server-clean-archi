import Category from "../../domain/Category.domain";
import Favori from "../../domain/Favori";
import TokenDomain from "../../domain/Token.domain";
import User from "../../domain/User";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import CategoryRepository from "../../ports/repositories/Category.repository";
import FavoriRepository from "../../ports/repositories/Favori.repository";
import GetFavorisByIdUserPerToCategoryUseCase from "../../usecases/favori/GetFavorisByIdUserPerToCategory.usecase";
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

const initCategory = (): Category => {
  const category = new Category();
  category.id = 1;

  return category;
}

describe("Get favoris by id user per to category use case unit tests", () => {
  let getFavorisByIdUserPerToCategoryUseCase: GetFavorisByIdUserPerToCategoryUseCase;

  let favoris: Favori[];
  let token: TokenDomain;
  let user: User;
  let category: Category;

  let favoriRepository: FavoriRepository = ({
    findByIdUserPerToCategory: null,
  } as unknown) as FavoriRepository;

  let categoryRepository: CategoryRepository = ({
    existById: null,
  } as unknown) as CategoryRepository;

  beforeEach(() => {
    favoris = initFavori();
    token = initToken();
    user = initUser();
    category = initCategory();

    getFavorisByIdUserPerToCategoryUseCase = new GetFavorisByIdUserPerToCategoryUseCase(
      favoriRepository,
      categoryRepository
    );

    spyOn(favoriRepository, "findByIdUserPerToCategory").and.callFake((id: any) => {
      if (id) {
        const result: Favori[] = favoris;
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("getFavorisByIdUserPerToCategoryUseCase should return message when it succeeded", async () => {
    spyOn(Utils, "isLogin").and.returnValue(true);
    spyOn(categoryRepository, "existById").and.returnValue(true);
    const result: Favori[] = await getFavorisByIdUserPerToCategoryUseCase.execute(user.pseudo, category.id,  token);
    expect(result).toBeDefined();
    expect(result.length).toBe(2);
    expect(result).toHaveLength(2);
    expect(result.map(favori => {
        expect(favori.pseudo).toEqual(token.pseudo);
    }))
  });

  it("getFavorisByIdUserPerToCategoryUseCase should throw a parameter exception when the token is null", async () => {
    try {
      await getFavorisByIdUserPerToCategoryUseCase.execute(user.pseudo, category.id,  undefined);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit de créer cette ressource"
      );
    }
  });

  it("getFavorisByIdUserPerToCategoryUseCase should throw a parameter exception when the token is not login", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(false);
      await getFavorisByIdUserPerToCategoryUseCase.execute(user.pseudo, category.id,  token);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit de créer cette ressource"
      );
    }
  });

  it("getFavorisByIdUserPerToCategoryUseCase should throw a parameter exception when the token don't correspond to pseudo", async () => {
      user.pseudo = "lucas";
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      await getFavorisByIdUserPerToCategoryUseCase.execute(user.pseudo, category.id,  token);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Problème technique"
      );
    }
  });

  it("getFavorisByIdUserPerToCategoryUseCase should throw a parameter exception when the category don't exist", async () => {
  try {
    spyOn(Utils, "isLogin").and.returnValue(true);
    spyOn(categoryRepository, "existById").and.returnValue(false);
    await getFavorisByIdUserPerToCategoryUseCase.execute(user.pseudo, category.id, token);
  } catch (e) {
    const a: BusinessException = e;
    expect(a.message).toBe(
      "La catégorie avec l'identifiant " + category.id + " n'existe pas"
    );
  }
});});
