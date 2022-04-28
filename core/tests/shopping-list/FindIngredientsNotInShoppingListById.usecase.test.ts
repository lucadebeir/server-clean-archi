import Ingredient from "../../domain/Ingredient";
import Shopping from "../../domain/Shopping";
import Token from "../../domain/Token";
import User from "../../domain/User";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import ShoppingRepository from "../../ports/repositories/Shopping.repository";
import UserRepository from "../../ports/repositories/User.repository";
import FindIngredientsNotInShoppingListByIdUsecase
    from "../../usecases/shopping-list/FindIngredientsNotInShoppingListById.usecase";
import * as Utils from "../../utils/token.service";

const initShoppingList = (): Shopping[] => {
  const shooping = new Shopping();
  shooping.id = 1;
  shooping.name_ingredient = "Tomates";
  shooping.pseudo = "luca";

  const shooping2 = new Shopping();
  shooping2.id = 2;
  shooping2.name_ingredient = "Carottes";
  shooping2.pseudo = "luca";

  const list = [shooping, shooping2];

  return list;
};

const initIngredients = (): Ingredient[] => {
  const ingredient = new Ingredient();
  ingredient.id = 1;
  ingredient.name = "Bananes";

  const ingredient2 = new Ingredient();
  ingredient2.id = 2;
  ingredient2.name = "Mozzarella";

  const list = [ingredient, ingredient2];

  return list;
};

const initUser = (): User => {
  const user = new User();
  user.pseudo = "luca";

  return user;
};

describe("Get shopping list by pseudo use case unit tests", () => {
  let getIngredientsNotInShoppingListByIdUseCase: FindIngredientsNotInShoppingListByIdUsecase;

  let shoppingList: Shopping[];
  let ingredients: Ingredient[];
  let token: Token = new Token();
  let user: User;

  let shoppingRepository: ShoppingRepository = {
    findIngredientsNotInShoppingListById: null,
  } as unknown as ShoppingRepository;

  let userRepository: UserRepository = {
    existByPseudo: null,
  } as unknown as UserRepository;

  beforeEach(() => {
    shoppingList = initShoppingList();
    ingredients = initIngredients();
    user = initUser();

    getIngredientsNotInShoppingListByIdUseCase =
      new FindIngredientsNotInShoppingListByIdUsecase(
        shoppingRepository,
        userRepository
      );

    spyOn(
      shoppingRepository,
      "findIngredientsNotInShoppingListById"
    ).and.callFake((pseudo: any) => {
      if (pseudo) {
        const result: Ingredient[] = ingredients;
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("getIngredientsNotInShoppingListByIdUseCase should return shopping list when it succeeded", async () => {
    spyOn(userRepository, "existByPseudo").and.returnValue(true);
    spyOn(Utils, "isLogin").and.returnValue(true);
    const result: Ingredient[] =
      await getIngredientsNotInShoppingListByIdUseCase.execute(
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
      result.some(({ name }) => name === "Carottes")
    ).toBe(false);
    expect(
      result.some(({ name }) => name === "Bananes")
    ).toBe(true);
    //expect(result).toEqual(expect.arrayContaining(shoppingList));
  });

  it("getIngredientsNotInShoppingListByIdUseCase should throw a parameter exception when the token is undefined", async () => {
    try {
      await getIngredientsNotInShoppingListByIdUseCase.execute(
        user.pseudo,
        undefined
      );
    } catch(e: any) {
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
    } catch(e: any) {
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
    } catch(e: any) {
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
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "L'identifiant " +
          user.pseudo +
          " ne correspond à aucune ressource existante"
      );
    }
  });
});
