import RecipeList from "../../domain/RecipeList";
import TokenDomain from "../../domain/Token.domain";
import User from "../../domain/User";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import RecipeListRepository from "../../ports/repositories/RecipeList.repository";
import UserRepository from "../../ports/repositories/User.repository";
import GetRecipeListByIdUseCase from "../../usecases/recipe-list/GetRecipeListById.usecase";
import * as Utils from "../../utils/token.service";

const initRecipeList = (): RecipeList[] => {
  const recipeList = new RecipeList();
  recipeList.idRecipeList = 1;
  recipeList.nomRecette = "Lasagnes";
  recipeList.pseudoUser = "luca";
  recipeList.complet = false;
  recipeList.idRecette = 1;

  const recipeList2 = new RecipeList();
  recipeList2.idRecipeList = 2;
  recipeList2.nomRecette = "Brocolis";
  recipeList2.pseudoUser = "luca";
  recipeList2.complet = false;
  recipeList2.idRecette = 2;

  const list = [recipeList, recipeList2];

  return list;
};

const initToken = (): TokenDomain => {
  const token = new TokenDomain();
  token.pseudo = "luca";

  return token;
};

const initUser = (): User => {
  const user = new User();
  user.pseudo = "luca";

  return user;
};

describe("Get recipe list by id use case unit tests", () => {
  let getRecipeListByIdUseCase: GetRecipeListByIdUseCase;

  let recipeList: RecipeList[];
  let token: TokenDomain;
  let user: User;

  let recipeListRepository: RecipeListRepository = ({
    findById: null,
  } as unknown) as RecipeListRepository;

  let userRepository: UserRepository = ({
    existByPseudo: null,
  } as unknown) as UserRepository;

  beforeEach(() => {
    recipeList = initRecipeList();
    token = initToken();
    user = initUser();

    getRecipeListByIdUseCase = new GetRecipeListByIdUseCase(
      recipeListRepository,
      userRepository
    );

    spyOn(recipeListRepository, "findById").and.callFake((id: any) => {
      if (id) {
        const result: RecipeList[] = recipeList;
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("getRecipeListByIdUseCase should return list of recipe when it succeeded", async () => {
    spyOn(Utils, "isLogin").and.returnValue(true);
    spyOn(userRepository, "existByPseudo").and.returnValue(true);
    const result: RecipeList[] = await getRecipeListByIdUseCase.execute(
      user.pseudo,
      token
    );
    expect(result).toBeDefined();
    expect(result.length).toStrictEqual(2);
    expect(result).toHaveLength(2);
    expect(
      result.map((recipe) => {
        expect(recipe.pseudoUser).toEqual(token.pseudo);
      })
    );
  });

  it("getRecipeListByIdUseCase should throw a parameter exception when the token is undefined", async () => {
    try {
      await getRecipeListByIdUseCase.execute(user.pseudo, undefined);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à ces ressources"
      );
    }
  });

  it("getRecipeListByIdUseCase should throw a parameter exception when the user is not an user", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(false);
      await getRecipeListByIdUseCase.execute(user.pseudo, token);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à ces ressources"
      );
    }
  });

  it("getRecipeListByIdUseCase should throw a parameter exception when the pseudo is null", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      await getRecipeListByIdUseCase.execute(undefined, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("Le pseudo d'un utilisateur est obligatoire");
    }
  });

  it("getRecipeListByIdUseCase should throw a parameter exception when the token don't correspond to pseudo", async () => {
    user.pseudo = "lucas";
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(true);
      await getRecipeListByIdUseCase.execute(user.pseudo, token);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Problème technique");
    }
  });

  it("getRecipeListByIdUseCase should throw a parameter exception when the pseudo doesnt exist", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(false);
      await getRecipeListByIdUseCase.execute(user.pseudo, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'utilisateur n'existe pas");
    }
  });
});
