import RecipeList from "../../domain/RecipeList";
import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import RecipeListRepository from "../../ports/repositories/RecipeList.repository";
import UserRepository from "../../ports/repositories/User.repository";
import AddRecipeToRecipeListUseCase from "../../usecases/recipe-list/AddRecipeToRecipeList.usecase";
import * as Utils from "../../utils/token.service";

const initRecipeList = (): RecipeList => {
  const recipeList = new RecipeList();
  recipeList.name_recipe = "Lasagnes";
  recipeList.pseudo = "luca";
  recipeList.complete = false;
  recipeList.id_recipe = 1;

  return recipeList;
};

const initToken = (): TokenDomain => {
  const token = new TokenDomain();
  token.pseudo = "luca";

  return token;
};

describe("Add recipe to recipe list use case unit tests", () => {
  let addRecipeToRecipeListUseCase: AddRecipeToRecipeListUseCase;

  let recipeList: RecipeList;
  let token: TokenDomain;

  let recipeListRepository: RecipeListRepository = ({
    addRecipe: null,
    existByName: null,
  } as unknown) as RecipeListRepository;

  let userRepository: UserRepository = ({
    existByPseudo: null,
  } as unknown) as UserRepository;

  beforeEach(() => {
    recipeList = initRecipeList();
    token = initToken();

    addRecipeToRecipeListUseCase = new AddRecipeToRecipeListUseCase(
      recipeListRepository,
      userRepository
    );

    spyOn(recipeListRepository, "addRecipe").and.callFake(
      (recipeList: RecipeList) => {
        if (recipeList) {
          const result: RecipeList = { ...recipeList, id: 1 };
          return new Promise((resolve, reject) => resolve(result));
        }
        return new Promise((resolve, reject) => resolve(null));
      }
    );
  });

  it("addRecipeToRecipeListUseCase should return list of recipe when it succeeded", async () => {
    spyOn(Utils, "isLogin").and.returnValue(true);
    spyOn(userRepository, "existByPseudo").and.returnValue(true);
    spyOn(recipeListRepository, "existByName").and.returnValue(false);
    const result: RecipeList = await addRecipeToRecipeListUseCase.execute(
      recipeList,
      token
    );
    expect(result).toBeDefined();
  });

  it("addRecipeToRecipeListUseCase should throw a parameter exception when the token is undefined", async () => {
    try {
      await addRecipeToRecipeListUseCase.execute(recipeList, undefined);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'ajouter cette ressource"
      );
    }
  });

  it("addRecipeToRecipeListUseCase should throw a parameter exception when the user is not an user", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(false);
      await addRecipeToRecipeListUseCase.execute(recipeList, token);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'ajouter cette ressource"
      );
    }
  });

  it("addRecipeToRecipeListUseCase should throw a parameter exception when the pseudo is null", async () => {
    recipeList.pseudo = undefined;
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      await addRecipeToRecipeListUseCase.execute(recipeList, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("Le pseudo d'un utilisateur est obligatoire");
    }
  });

  it("addRecipeToRecipeListUseCase should throw a parameter exception when the token don't correspond to pseudo", async () => {
    recipeList.pseudo = "lucas";
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(true);
      await addRecipeToRecipeListUseCase.execute(recipeList, token);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Problème technique");
    }
  });

  it("addRecipeToRecipeListUseCase should throw a parameter exception when the pseudo doesnt exist", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(false);
      await addRecipeToRecipeListUseCase.execute(recipeList, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'utilisateur n'existe pas");
    }
  });

  it("addRecipeToRecipeListUseCase should throw a parameter exception when the name already exist on my menu", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(true);
      spyOn(recipeListRepository, "existByName").and.returnValue(true);
      await addRecipeToRecipeListUseCase.execute(recipeList, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "La recette " +
          recipeList.name_recipe +
          " se trouve déjà dans le menu de l'utilisateur " +
          recipeList.pseudo
      );
    }
  });

  it("addRecipeToRecipeListUseCase should throw a parameter exception when the name already exist on my menu", async () => {
    recipeList.name_recipe =
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(true);
      spyOn(recipeListRepository, "existByName").and.returnValue(false);
      await addRecipeToRecipeListUseCase.execute(recipeList, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Le nom d'une recette ne doit pas dépasser 60 caractères"
      );
    }
  });
});
