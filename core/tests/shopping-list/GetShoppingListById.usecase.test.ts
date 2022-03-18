import Shopping from "../../domain/Shopping";
import Token from "../../domain/Token";
import User from "../../domain/User";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import ShoppingRepository from "../../ports/repositories/Shopping.repository";
import UserRepository from "../../ports/repositories/User.repository";
import GetShoppingListByIdUseCase from "../../usecases/shopping-list/GetShoppingListById.usecase";
import * as Utils from "../../utils/token.service";

const initShoppingList = (): Shopping[] => {
  const shopping = new Shopping();
  shopping.id = 1;
  shopping.name_ingredient = "Tomates";
  shopping.pseudo = "luca";

  const shopping2 = new Shopping();
  shopping2.id = 2;
  shopping2.name_ingredient = "Carottes";
  shopping2.pseudo = "luca";

  const list = [shopping, shopping2];

  return list;
};

const initUser = (): User => {
  const user = new User();
  user.pseudo = "luca";

  return user;
};

describe("Get shopping list by pseudo use case unit tests", () => {
  let getShoppingListByIdUseCase: GetShoppingListByIdUseCase;

  let shoppingList: Shopping[];
  let token: Token = new Token();
  let user: User;

  let shoppingRepository: ShoppingRepository = {
    findById: null,
  } as unknown as ShoppingRepository;

  let userRepository: UserRepository = {
    existByPseudo: null,
  } as unknown as UserRepository;

  beforeEach(() => {
    shoppingList = initShoppingList();
    user = initUser();

    getShoppingListByIdUseCase = new GetShoppingListByIdUseCase(
      shoppingRepository,
      userRepository
    );

    spyOn(shoppingRepository, "findById").and.callFake((pseudo: any) => {
      if (pseudo) {
        const result: Shopping[] = shoppingList;
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("getShoppingListByIdUseCase should return shopping list when it succeeded", async () => {
    spyOn(userRepository, "existByPseudo").and.returnValue(true);
    spyOn(Utils, "isLogin").and.returnValue(true);
    const result: Shopping[] = await getShoppingListByIdUseCase.execute(
      user.pseudo,
      token
    );
    expect(result).toBeDefined();
    expect(result.length).toBe(2);
    expect(result).toHaveLength(2);
    expect(
      result.map((ingredient) =>
        expect(ingredient.pseudo).toStrictEqual(user.pseudo)
      )
    );
  });

  it("getShoppingListByIdUseCase should throw a parameter exception when the token is undefined", async () => {
    try {
      await getShoppingListByIdUseCase.execute(user.pseudo, undefined);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à ces ressources"
      );
    }
  });

  it("getShoppingListByIdUseCase should throw a parameter exception when the user is not connect", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(false);
      await getShoppingListByIdUseCase.execute(user.pseudo, token);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à ces ressources"
      );
    }
  });

  it("getShoppingListByIdUseCase should throw a parameter exception when the id is null", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      await getShoppingListByIdUseCase.execute(undefined, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'identifiant d'un utilisateur est obligatoire");
    }
  });

  it("getShoppingListByIdUseCase should throw a parameter exception when the pseudo doesn't exist", async () => {
    try {
      spyOn(userRepository, "existByPseudo").and.returnValue(false);
      spyOn(Utils, "isLogin").and.returnValue(true);
      await getShoppingListByIdUseCase.execute(user.pseudo, token);
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
