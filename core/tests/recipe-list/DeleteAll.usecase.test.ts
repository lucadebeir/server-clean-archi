import RecipeList from "../../domain/RecipeList";
import TokenDomain from "../../domain/Token.domain";
import User from "../../domain/User";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import RecipeListRepository from "../../ports/repositories/RecipeList.repository";
import UserRepository from "../../ports/repositories/User.repository";
import DeleteAllUseCase from "../../usecases/recipe-list/DeleteAll.usecase";
import * as Utils from "../../utils/token.service";

const initUser = (): User => {
  const user = new User();
  user.pseudo = "luca";

  return user;
};

const initToken = (): TokenDomain => {
  const token = new TokenDomain();
  token.pseudo = "luca";

  return token;
};

describe("Delete all recipe from recipe list use case unit tests", () => {
  let deleteAllUseCase: DeleteAllUseCase;

  let token: TokenDomain;
  let user: User;

  let recipeListRepository: RecipeListRepository = ({
    deleteAll: null,
  } as unknown) as RecipeListRepository;

  let userRepository: UserRepository = ({
    existByPseudo: null,
  } as unknown) as UserRepository;

  beforeEach(() => {
    user = initUser();
    token = initToken();

    deleteAllUseCase = new DeleteAllUseCase(
      recipeListRepository,
      userRepository
    );

    spyOn(recipeListRepository, "deleteAll").and.callFake((pseudo: any) => {
      if (pseudo) {
        const result: string =
          "Toutes les recettes sont bien supprimées de mon menu";
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("deleteAllUseCase should return list of recipe when it succeeded", async () => {
    spyOn(Utils, "isLogin").and.returnValue(true);
    spyOn(userRepository, "existByPseudo").and.returnValue(true);
    const result: string = await deleteAllUseCase.execute(user.pseudo, token);
    expect(result).toBeDefined();
    expect(result).toStrictEqual(
      "Toutes les recettes sont bien supprimées de mon menu"
    );
  });

  it("deleteAllUseCase should throw a parameter exception when the token is undefined", async () => {
    try {
      await deleteAllUseCase.execute(user.pseudo, undefined);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit de supprimer ces ressources"
      );
    }
  });

  it("deleteAllUseCase should throw a parameter exception when the user is not an user", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(false);
      await deleteAllUseCase.execute(user.pseudo, token);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit de supprimer ces ressources"
      );
    }
  });

  it("deleteAllUseCase should throw a parameter exception when the pseudo is null", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      await deleteAllUseCase.execute(undefined, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("Le pseudo d'un utilisateur est obligatoire");
    }
  });

  it("deleteAllUseCase should throw a parameter exception when the token don't correspond to pseudo", async () => {
    user.pseudo = "lucas";
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(true);
      await deleteAllUseCase.execute(user.pseudo, token);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Problème technique");
    }
  });

  it("deleteAllUseCase should throw a parameter exception when the pseudo doesnt exist", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(false);
      await deleteAllUseCase.execute(user.pseudo, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'utilisateur n'existe pas");
    }
  });
});
