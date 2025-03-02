import Shopping from "../../domain/Shopping";
import Token from "../../domain/Token";
import User from "../../domain/User";
import ShoppingRepository from "../../ports/repositories/Shopping.repository";
import UserRepository from "../../ports/repositories/User.repository";
import AddIngredientToShoppingListUseCase from "../../usecases/shopping-list/AddIngredientToShoppingList.usecase";
import * as Utils from "../../utils/token.service";
import Unity from "../../domain/Unity";

const initShopping = (): Shopping => {
  const shopping = new Shopping();
  shopping.name_ingredient = "Tomates";
  shopping.pseudo = "luca";
  shopping.quantity = 1;
  shopping.id_unit = 1;
  shopping.unit = new Unity();

  return shopping;
};

const initUser = (): User => {
  const user = new User();
  user.pseudo = "luca";

  return user;
};

describe("Add ingredient to shopping list by pseudo use case unit tests", () => {
  let addIngredientToShoppingListUseCase: AddIngredientToShoppingListUseCase;

  let shopping: Shopping;
  let token: Token = new Token();
  let user: User;

  let shoppingRepository: ShoppingRepository = {
    addIngredientToShoppingList: null,
    exist: null,
  } as unknown as ShoppingRepository;

  let userRepository: UserRepository = {
    existByPseudo: null,
  } as unknown as UserRepository;

  beforeEach(() => {
    shopping = initShopping();
    user = initUser();

    addIngredientToShoppingListUseCase = new AddIngredientToShoppingListUseCase(
      shoppingRepository,
      userRepository
    );

    spyOn(shoppingRepository, "addIngredientToShoppingList").and.callFake(
      (shopping: Shopping) => {
        if (shopping) {
          const result: string =
            "L'ingrédient est bien ajouté à la liste de courses de l'utilisateur";
          return new Promise((resolve, reject) => resolve(result));
        }
        return new Promise((resolve, reject) => resolve(null));
      }
    );
  });

  it("addIngredientToShoppingListUseCase should return shopping list when it succeeded", async () => {
    spyOn(userRepository, "existByPseudo").and.returnValue(true);
    spyOn(shoppingRepository, "exist").and.returnValue(false);
    spyOn(Utils, "isLogin").and.returnValue(true);
    const result: string = await addIngredientToShoppingListUseCase.execute(
      shopping,
      token
    );
    expect(result).toBeDefined();
    expect(result).toStrictEqual(
      "L'ingrédient est bien ajouté à la liste de courses de l'utilisateur"
    );
  });

  /*it("addIngredientToShoppingListUseCase should throw a parameter exception when the token is undefined", async () => {
    try {
      await addIngredientToShoppingListUseCase.execute(shopping, undefined);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'ajouter cette ressource"
      );
    }
  });

  it("addIngredientToShoppingListUseCase should throw a parameter exception when the user is not connect", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(false);
      await addIngredientToShoppingListUseCase.execute(shopping, token);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'ajouter cette ressource"
      );
    }
  });

  it("addIngredientToShoppingListUseCase should throw a parameter exception when the pseudo doesn't exist", async () => {
    try {
      spyOn(userRepository, "existByPseudo").and.returnValue(false);
      spyOn(Utils, "isLogin").and.returnValue(true);
      await addIngredientToShoppingListUseCase.execute(shopping, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "L'identifiant " +
          shopping.pseudo +
          " ne correspond à aucune ressource existante"
      );
    }
  });

  it("addIngredientToShoppingListUseCase should throw a parameter exception when the association between the name of ingredient and the pseudo already exist", async () => {
    try {
      spyOn(userRepository, "existByPseudo").and.returnValue(true);
      spyOn(shoppingRepository, "exist").and.returnValue(true);
      spyOn(Utils, "isLogin").and.returnValue(true);
      await addIngredientToShoppingListUseCase.execute(shopping, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "L'ingrédient " +
          shopping.name_ingredient +
          " se trouve déjà dans la liste de courses de l'utilisateur " +
          shopping.pseudo
      );
    }
  });

  it("addIngredientToShoppingListUseCase should throw a parameter exception when the name of ingredient is too long (length superior to 40 characters)", async () => {
    shopping.name_ingredient =
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    try {
      spyOn(userRepository, "existByPseudo").and.returnValue(true);
      spyOn(shoppingRepository, "exist").and.returnValue(false);
      spyOn(Utils, "isLogin").and.returnValue(true);
      await addIngredientToShoppingListUseCase.execute(shopping, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Le nom d'un ingrédient ne doit pas dépasser 40 caractères"
      );
    }
  });*/
});
