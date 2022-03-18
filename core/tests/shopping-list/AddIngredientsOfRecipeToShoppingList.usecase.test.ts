import Ingredient from "../../domain/Ingredient";
import Shopping from "../../domain/Shopping";
import Token from "../../domain/Token";
import User from "../../domain/User";
import ShoppingRepository from "../../ports/repositories/Shopping.repository";
import AddIngredientsOfRecipeToShoppingListUseCase
  from "../../usecases/shopping-list/AddIngredientsOfRecipeToShoppingList.usecase";
import * as Utils from "../../utils/token.service";
import Unity from "../../domain/Unity";

const initShoppingList = (): Shopping[] => {
  const item = new Shopping();
  const ingredient = new Ingredient();
  ingredient.id = 1;
  ingredient.name = "Tomates";
  item.ingredient = ingredient;
  const unit = new Unity();
  unit.id = 1;
  item.unit = unit;

  const item2 = new Shopping();
  const ingredient2 = new Ingredient();
  ingredient2.id = 2;
  ingredient2.name = "Oignons";
  item2.ingredient = ingredient2;
  item2.unit = unit;

  return [item, item2];
};

const initUser = (): User => {
  const user = new User();
  user.pseudo = "luca";

  return user;
};

describe("Add ingredients of recipe to shopping list by pseudo use case unit tests", () => {
  let addIngredientsOfRecipeToShoppingListUseCase: AddIngredientsOfRecipeToShoppingListUseCase;

  let ingredients: Shopping[];
  let token: Token = new Token();
  let user: User;

  let shoppingRepository: ShoppingRepository = ({
    addIngredientsOfRecipeToShoppingList: null,
    exist: null,
  } as unknown) as ShoppingRepository;

  beforeEach(() => {
    ingredients = initShoppingList();
    user = initUser();

    addIngredientsOfRecipeToShoppingListUseCase = new AddIngredientsOfRecipeToShoppingListUseCase(
      shoppingRepository
    );

    spyOn(
      shoppingRepository,
      "addIngredientToShoppingList"
    ).and.callFake((list: Ingredient[]) => {
      return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("addIngredientsOfRecipeToShoppingListUseCase should return shopping list when it succeeded", async () => {
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

  /*it("addIngredientsOfRecipeToShoppingListUseCase should throw a parameter exception when the token is undefined", async () => {
    try {
      await addIngredientsOfRecipeToShoppingListUseCase.execute(
        user.pseudo,
        ingredients,
        undefined
      );
    } catch(e: any) {
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
    } catch(e: any) {
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
    } catch(e: any) {
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
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "L'identifiant " +
          user.pseudo +
          " ne correspond à aucune ressource existante"
      );
    }
  });*/
});
