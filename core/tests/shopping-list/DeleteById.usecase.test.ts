import Shopping from "../../domain/Shopping";
import TokenDomain from "../../domain/Token.domain";
import User from "../../domain/User";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import ShoppingRepository from "../../ports/repositories/Shopping.repository";
import UserRepository from "../../ports/repositories/User.repository";
import DeleteByIdUseCase from "../../usecases/shopping-list/DeleteById.usecase";
import * as Utils from "../../utils/token.service";

const initShoppingList = (): Shopping => {
  const shopping = new Shopping();
  shopping.id = 1;
  shopping.name_ingredient = "Tomates";
  shopping.pseudo = "luca";

  return shopping;
};

const initUser = (): User => {
  const user = new User();
  user.pseudo = "luca";

  return user;
};

describe("Delete element from recipe list by id use case unit tests", () => {
  let deleteByIdUseCase: DeleteByIdUseCase;

  let shoppingList: Shopping;
  let token: TokenDomain = new TokenDomain();
  let user: User;

  let shoppingRepository: ShoppingRepository = {
    deleteById: null,
  } as unknown as ShoppingRepository;

  let userRepository: UserRepository = {
    existByPseudo: null,
  } as unknown as UserRepository;

  beforeEach(() => {
    shoppingList = initShoppingList();
    user = initUser();

    deleteByIdUseCase = new DeleteByIdUseCase(
      shoppingRepository,
      userRepository
    );

    spyOn(shoppingRepository, "deleteById").and.callFake((id: any) => {
      if (id) {
        const result: string =
          "L'ingrédient est bien supprimée de ma liste de courses";
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("deleteByIdUseCase should return shopping list when it succeeded", async () => {
    spyOn(userRepository, "existByPseudo").and.returnValue(true);
    spyOn(Utils, "isLogin").and.returnValue(true);
    const result: string = await deleteByIdUseCase.execute(
      shoppingList.id,
      token
    );
    expect(result).toBeDefined();
    expect(result).toStrictEqual(
      "L'ingrédient est bien supprimée de ma liste de courses"
    );
  });

  it("deleteByIdUseCase should throw a parameter exception when the token is undefined", async () => {
    try {
      await deleteByIdUseCase.execute(shoppingList.id, undefined);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit de supprimer à ces ressources"
      );
    }
  });

  it("deleteByIdUseCase should throw a parameter exception when the user is not connect", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(false);
      await deleteByIdUseCase.execute(shoppingList.id, token);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit de supprimer à ces ressources"
      );
    }
  });

  it("deleteByIdUseCase should throw a parameter exception when the id is null", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      await deleteByIdUseCase.execute(undefined, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "L'identifiant d'un élément de la liste de courses est obligatoire"
      );
    }
  });

  it("deleteByIdUseCase should throw a parameter exception when the pseudo doesn't exist", async () => {
    try {
      spyOn(userRepository, "existByPseudo").and.returnValue(false);
      spyOn(Utils, "isLogin").and.returnValue(true);
      await deleteByIdUseCase.execute(shoppingList.id, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "L'identifiant " +
          token.pseudo +
          " ne correspond à aucune ressource existante"
      );
    }
  });
});
