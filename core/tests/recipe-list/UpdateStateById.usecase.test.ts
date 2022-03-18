import RecipeList from "../../domain/RecipeList";
import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import RecipeListRepository from "../../ports/repositories/RecipeList.repository";
import UserRepository from "../../ports/repositories/User.repository";
import UpdateStateByIdUseCase from "../../usecases/recipe-list/UpdateStateById.usecase";
import * as Utils from "../../utils/token.service";

const initRecipeList = (): RecipeList => {
  const recipeList = new RecipeList();
  recipeList.id = 1;
  recipeList.name_recipe = "Lasagnes";
  recipeList.pseudo = "luca";
  recipeList.complete = false;
  recipeList.id_recipe = 1;

  return recipeList;
};

const initToken = (): Token => {
  const token = new Token();
  token.pseudo = "luca";

  return token;
};

describe("Update state by id use case unit tests", () => {
  let updateStateByIdUseCase: UpdateStateByIdUseCase;

  let recipeList: RecipeList;
  let token: Token;

  let recipeListRepository: RecipeListRepository = ({
    updateState: null,
  } as unknown) as RecipeListRepository;

  let userRepository: UserRepository = ({
    existByPseudo: null,
  } as unknown) as UserRepository;

  beforeEach(() => {
    recipeList = initRecipeList();
    token = initToken();

    updateStateByIdUseCase = new UpdateStateByIdUseCase(
      recipeListRepository,
      userRepository
    );

    spyOn(recipeListRepository, "updateState").and.callFake(
      (recipeList: RecipeList) => {
        if (recipeList) {
          const result: string = "L'état de la recette a bien été modifié";
          return new Promise((resolve, reject) => resolve(result));
        }
        return new Promise((resolve, reject) => resolve(null));
      }
    );
  });

  it("updateStateByIdUseCase should return list of recipe when it succeeded", async () => {
    spyOn(Utils, "isLogin").and.returnValue(true);
    spyOn(userRepository, "existByPseudo").and.returnValue(true);
    const result: string = await updateStateByIdUseCase.execute(
      recipeList,
      token
    );
    expect(result).toBeDefined();
    expect(result).toStrictEqual("L'état de la recette a bien été modifié");
  });

  it("updateStateByIdUseCase should throw a parameter exception when the token is undefined", async () => {
    try {
      await updateStateByIdUseCase.execute(recipeList, undefined);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit de modifier cette ressource"
      );
    }
  });

  it("updateStateByIdUseCase should throw a parameter exception when the user is not an user", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(false);
      await updateStateByIdUseCase.execute(recipeList, token);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit de modifier cette ressource"
      );
    }
  });

  it("updateStateByIdUseCase should throw a parameter exception when the token don't correspond to pseudo", async () => {
    recipeList.pseudo = "lucas";
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(true);
      await updateStateByIdUseCase.execute(recipeList, token);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Problème technique");
    }
  });

  it("updateStateByIdUseCase should throw a parameter exception when the token don't correspond to pseudo", async () => {
    recipeList.pseudo = undefined;
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(true);
      await updateStateByIdUseCase.execute(recipeList, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("Le pseudo d'un utilisateur est obligatoire");
    }
  });

  it("updateStateByIdUseCase should throw a parameter exception when the pseudo doesnt exist", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(false);
      await updateStateByIdUseCase.execute(recipeList, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'utilisateur n'existe pas");
    }
  });
});
