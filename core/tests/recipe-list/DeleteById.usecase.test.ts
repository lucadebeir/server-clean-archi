import RecipeList from "../../domain/RecipeList";
import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import RecipeListRepository from "../../ports/repositories/RecipeList.repository";
import UserRepository from "../../ports/repositories/User.repository";
import DeleteByIdUseCase from "../../usecases/recipe-list/DeleteById.usecase";
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

describe("Delete recipe from recipe list by id use case unit tests", () => {
  let deleteByIdUseCase: DeleteByIdUseCase;

  let recipeList: RecipeList;
  let token: Token;

  let recipeListRepository: RecipeListRepository = ({
    deleteById: null,
    existById: null,
  } as unknown) as RecipeListRepository;

  let userRepository: UserRepository = ({
    existByPseudo: null,
  } as unknown) as UserRepository;

  beforeEach(() => {
    recipeList = initRecipeList();
    token = initToken();

    deleteByIdUseCase = new DeleteByIdUseCase(
      recipeListRepository,
      userRepository
    );

    spyOn(recipeListRepository, "deleteById").and.callFake(
      (id: any, pseudo: any) => {
        if (id && pseudo) {
          const result: string = "Recette bien supprimée de mon menu";
          return new Promise((resolve, reject) => resolve(result));
        }
        return new Promise((resolve, reject) => resolve(null));
      }
    );
  });

  it("deleteByIdUseCase should return list of recipe when it succeeded", async () => {
    spyOn(Utils, "isLogin").and.returnValue(true);
    spyOn(userRepository, "existByPseudo").and.returnValue(true);
    spyOn(recipeListRepository, "existById").and.returnValue(true);
    const result: string = await deleteByIdUseCase.execute(
      recipeList.id,
      recipeList.pseudo,
      token
    );
    expect(result).toBeDefined();
    expect(result).toStrictEqual("Recette bien supprimée de mon menu");
  });

  it("deleteByIdUseCase should throw a parameter exception when the token is undefined", async () => {
    try {
      await deleteByIdUseCase.execute(
        recipeList.id,
        recipeList.pseudo,
        undefined
      );
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit de supprimer cette ressource"
      );
    }
  });

  it("deleteByIdUseCase should throw a parameter exception when the user is not an user", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(false);
      await deleteByIdUseCase.execute(
        recipeList.id,
        recipeList.pseudo,
        token
      );
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit de supprimer cette ressource"
      );
    }
  });

  it("deleteByIdUseCase should throw a parameter exception when the pseudo is null", async () => {
    recipeList.pseudo = undefined;
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      await deleteByIdUseCase.execute(
        recipeList.id,
        recipeList.pseudo,
        token
      );
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("Le pseudo d'un utilisateur est obligatoire");
    }
  });

  it("deleteByIdUseCase should throw a parameter exception when the token don't correspond to pseudo", async () => {
    recipeList.pseudo = "lucas";
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(true);
      await deleteByIdUseCase.execute(
        recipeList.id,
        recipeList.pseudo,
        token
      );
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Problème technique");
    }
  });

  it("deleteByIdUseCase should throw a parameter exception when the pseudo doesnt exist", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(false);
      await deleteByIdUseCase.execute(
        recipeList.id,
        recipeList.pseudo,
        token
      );
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'utilisateur n'existe pas");
    }
  });
});
