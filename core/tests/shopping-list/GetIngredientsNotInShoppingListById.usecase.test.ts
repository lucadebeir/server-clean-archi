import Ingredient from "../../domain/Ingredient";
import Shopping from "../../domain/Shopping";
import TokenDomain from "../../domain/Token.domain";
import User from "../../domain/User";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import ShoppingRepository from "../../ports/repositories/Shopping.repository";
import UserRepository from "../../ports/repositories/User.repository";
import GetIngredientsNotInShoppingListByIdUseCase from "../../usecases/shopping-list/GetIngredientsNotInShoppingListById.usecase";
import * as Utils from "../../utils/token.service";

const initShoppingList = (): Shopping[] => {
  const shooping = new Shopping();
  shooping.idIngredientList = 1;
  shooping.nomIngredient = "Tomates";
  shooping.pseudo = "luca";

  const shooping2 = new Shopping();
  shooping2.idIngredientList = 2;
  shooping2.nomIngredient = "Carottes";
  shooping2.pseudo = "luca";

  const list = [shooping, shooping2];

  return list;
};

const initIngredients = (): Ingredient[] => {
  const ingredient = new Ingredient();
  ingredient.idIngredient = 1;
  ingredient.nomIngredient = "Bananes";

  const ingredient2 = new Ingredient();
  ingredient2.idIngredient = 2;
  ingredient2.nomIngredient = "Mozzarella";

  const list = [ingredient, ingredient2];

  return list;
};

const initUser = (): User => {
  const user = new User();
  user.pseudo = "luca";

  return user;
};

describe("Get shopping list by pseudo use case unit tests", () => {
  let getIngredientsNotInShoppingListByIdUseCase: GetIngredientsNotInShoppingListByIdUseCase;

  let shoppingList: Shopping[];
  let ingredients: Ingredient[];
  let token: TokenDomain = new TokenDomain();
  let user: User;

  let shoppingRepository: ShoppingRepository = ({
    findIngredientsNotInShoppingListById: null,
  } as unknown) as ShoppingRepository;

  let userRepository: UserRepository = ({
    existByPseudo: null,
  } as unknown) as UserRepository;

  beforeEach(() => {
    shoppingList = initShoppingList();
    ingredients = initIngredients();
    user = initUser();

    getIngredientsNotInShoppingListByIdUseCase = new GetIngredientsNotInShoppingListByIdUseCase(
      shoppingRepository,
      userRepository
    );

    spyOn(
      shoppingRepository,
      "findIngredientsNotInShoppingListById"
    ).and.callFake((pseudo: any) => {
      if (pseudo) {
        const result: Shopping[] = ingredients;
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("getIngredientsNotInShoppingListByIdUseCase should return shopping list when it succeeded", async () => {
    spyOn(userRepository, "existByPseudo").and.returnValue(true);
    spyOn(Utils, "isLogin").and.returnValue(true);
    const result: Shopping[] = await getIngredientsNotInShoppingListByIdUseCase.execute(
      user.pseudo,
      token
    );
    expect(result).toBeDefined();
    expect(result.length).toBe(2);
    expect(result).toHaveLength(2);
    expect(
      result.map((ingredient) => expect(ingredients).toContain(ingredient))
    );
    expect(
      result.map((ingredient) => expect(shoppingList).not.toContain(ingredient))
    );

    expect(
      result.some(({ nomIngredient }) => nomIngredient === "Carottes")
    ).toBe(false);
    expect(
      result.some(({ nomIngredient }) => nomIngredient === "Bananes")
    ).toBe(true);
    //expect(result).toEqual(expect.arrayContaining(shoppingList));
  });

  it("getIngredientsNotInShoppingListByIdUseCase should throw a parameter exception when the token is undefined", async () => {
    try {
      await getIngredientsNotInShoppingListByIdUseCase.execute(
        user.pseudo,
        undefined
      );
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à ces ressources"
      );
    }
  });

  it("getIngredientsNotInShoppingListByIdUseCase should throw a parameter exception when the user is not connect", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(false);
      await getIngredientsNotInShoppingListByIdUseCase.execute(
        user.pseudo,
        token
      );
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à ces ressources"
      );
    }
  });

  it("getIngredientsNotInShoppingListByIdUseCase should throw a parameter exception when the id is null", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      await getIngredientsNotInShoppingListByIdUseCase.execute(
        undefined,
        token
      );
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'identifiant d'un utilisateur est obligatoire");
    }
  });

  it("getIngredientsNotInShoppingListByIdUseCase should throw a parameter exception when the pseudo doesn't exist", async () => {
    try {
      spyOn(userRepository, "existByPseudo").and.returnValue(false);
      spyOn(Utils, "isLogin").and.returnValue(true);
      await getIngredientsNotInShoppingListByIdUseCase.execute(
        user.pseudo,
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
