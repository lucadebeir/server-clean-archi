import Ingredient from "../../domain/Ingredient";
import Shopping from "../../domain/Shopping";
import TokenDomain from "../../domain/Token.domain";
import User from "../../domain/User";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import ShoppingRepository from "../../ports/repositories/Shopping.repository";
import UserRepository from "../../ports/repositories/User.repository";
import AddIngredientsOfRecipeToShoppingListUseCase from "../../usecases/shopping-list/AddIngredientsOfRecipeToShoppingList.usecase";
import * as Utils from "../../utils/token.service";

const initIngredients = (): Ingredient[] => {
  const ingredient = new Ingredient();
  ingredient.idIngredient = 1;
  ingredient.nomIngredient = "Tomates";

  const ingredient2 = new Ingredient();
  ingredient2.idIngredient = 2;
  ingredient2.nomIngredient = "Oignons";

  const list = [ingredient, ingredient2];

  return list;
};

const initUser = (): User => {
  const user = new User();
  user.pseudo = "luca";

  return user;
};

describe("Add ingredients of recipe to shopping list by pseudo use case unit tests", () => {
  let addIngredientsOfRecipeToShoppingListUseCase: AddIngredientsOfRecipeToShoppingListUseCase;

  let ingredients: Ingredient[];
  let token: TokenDomain = new TokenDomain();
  let user: User;

  let shoppingRepository: ShoppingRepository = ({
    addIngredientsOfRecipeToShoppingList: null,
    exist: null,
  } as unknown) as ShoppingRepository;

  let userRepository: UserRepository = ({
    existByPseudo: null,
  } as unknown) as UserRepository;

  beforeEach(() => {
    ingredients = initIngredients();
    user = initUser();

    addIngredientsOfRecipeToShoppingListUseCase = new AddIngredientsOfRecipeToShoppingListUseCase(
      shoppingRepository,
      userRepository
    );

    spyOn(
      shoppingRepository,
      "addIngredientsOfRecipeToShoppingList"
    ).and.callFake((list: Ingredient[]) => {
      if (list) {
        const result: string =
          "Les ingrédients de la recette sont bien ajoutés à la liste de courses de l'utilisateur";
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("addIngredientsOfRecipeToShoppingListUseCase should return shopping list when it succeeded", async () => {
    spyOn(userRepository, "existByPseudo").and.returnValue(true);
    spyOn(Utils, "isLogin").and.returnValue(true);
    spyOn(shoppingRepository, "exist").and.returnValue(true);
    const result: string = await addIngredientsOfRecipeToShoppingListUseCase.execute(
      user.pseudo,
      ingredients,
      token
    );
    expect(result).toBeDefined();
    expect(result).toStrictEqual(
      "Les ingrédients de la recette sont bien ajoutés à la liste de courses de l'utilisateur"
    );
  });

  it("addIngredientsOfRecipeToShoppingListUseCase should throw a parameter exception when the token is undefined", async () => {
    try {
      await addIngredientsOfRecipeToShoppingListUseCase.execute(
        user.pseudo,
        ingredients,
        undefined
      );
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'ajouter ces ressources"
      );
    }
  });

  it("addIngredientsOfRecipeToShoppingListUseCase should throw a parameter exception when the user is not connect", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(false);
      await addIngredientsOfRecipeToShoppingListUseCase.execute(
        user.pseudo,
        ingredients,
        token
      );
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'ajouter ces ressources"
      );
    }
  });

  it("addIngredientsOfRecipeToShoppingListUseCase should throw a parameter exception when the pseudo is undefined", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      await addIngredientsOfRecipeToShoppingListUseCase.execute(
        undefined,
        ingredients,
        token
      );
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'identifiant d'un utilisateur est obligatoire");
    }
  });

  it("addIngredientsOfRecipeToShoppingListUseCase should throw a parameter exception when the pseudo doesn't exist", async () => {
    try {
      spyOn(userRepository, "existByPseudo").and.returnValue(false);
      spyOn(Utils, "isLogin").and.returnValue(true);
      await addIngredientsOfRecipeToShoppingListUseCase.execute(
        user.pseudo,
        ingredients,
        token
      );
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "L'identifiant " +
          user.pseudo +
          " ne correspond à aucune ressource existante"
      );
    }
  });
});
