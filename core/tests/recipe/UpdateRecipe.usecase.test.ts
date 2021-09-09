import Recipe from "../../domain/Recipe";
import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import * as Utils from "../../utils/token.service";
import date from "date-and-time";
import UseIngredient from "../../domain/UseIngredient";
import ImageDomain from "../../domain/Image.domain";
import ClassifyIn from "../../domain/ClassifyIn";
import CategoryRepository from "../../ports/repositories/Category.repository";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";
import UnityRepository from "../../ports/repositories/Unity.repository";
import UpdateRecipeUseCase from "../../usecases/recipe/UpdateRecipe.usecase";
import Category from "../../domain/Category.domain";
import Ingredient from "../../domain/Ingredient";
import Unity from "../../domain/Unity";
import Etape from "../../domain/Etape.domain";

const initRecipe = (): Recipe => {
  const recipe = new Recipe();
  recipe.id = 1;
  recipe.name = "Lasagnes";
  recipe.steps = initSteps();
  recipe.number_portion = 1;
  recipe.name_portion = "Bocal";
  recipe.preparation_time = date.format(new Date("00:08:00"), "hh:mm:ss");
  recipe.rest_time = date.format(new Date("00:08:00"), "hh:mm:ss");
  recipe.astuce =
    "* Vous pouvez remplacer le beurre de cacahuètes par une autre purée d'oléagineux (amandes, cajou, noisettes..).";
  recipe.mot =
    "Un granola qui conviendra parfaitement aux fan de BANANA bread !";
  recipe.number_views = 0;
  recipe.number_favorites = 0;
  recipe.date = new Date("01/04/2021");

  const category = new Category();
  category.id = 1;
  category.name = "Douceur";

  recipe.categories = [category];

  recipe.ingredients = initUseIngredient();

  const image = new ImageDomain();
  image.id = 1;
  image.link =
    "https://storage.googleapis.com/recipes-of-marine/IMG_20200903_103750_461311495694712.jpg";
  image.name = "IMG_20200903_103750_461311495694712.jpg";

  recipe.images = [image];

  return recipe;
};

const initSteps = (): Etape[] => {
  const step = new Etape();
  step.indication = "Préchauffer le four à 180°C.";
  step.number = 1;
  step.id_recipe = 1;

  return [step];
};

const initUseIngredient = (): UseIngredient[] => {
  const useIngredient = new UseIngredient();
  useIngredient.ingredient = new Ingredient();
  useIngredient.ingredient.id = 1;
  useIngredient.ingredient.name = "Bolo";
  useIngredient.unite = new Unity();
  useIngredient.unite.id = 1;
  useIngredient.unite.name = "g";
  useIngredient.quantity = 1;

  const list: UseIngredient[] = [useIngredient];

  return list;
};

describe("Update recipe use case unit tests", () => {
  let updateRecipeUseCase: UpdateRecipeUseCase;

  let recipe: Recipe;
  let useIngredient: UseIngredient[];
  let user: TokenDomain = new TokenDomain();

  let recipeRepository: RecipeRepository = {
    update: null,
    existByName: null,
  } as unknown as RecipeRepository;

  let categoryRepository: CategoryRepository = {
    existById: null,
  } as unknown as CategoryRepository;

  let ingredientRepository: IngredientRepository = {
    existById: null,
  } as unknown as IngredientRepository;

  let unityRepository: UnityRepository = {
    existById: null,
  } as unknown as UnityRepository;

  beforeEach(() => {
    recipe = initRecipe();
    useIngredient = initUseIngredient();

    updateRecipeUseCase = new UpdateRecipeUseCase(
      recipeRepository,
      categoryRepository,
      ingredientRepository,
      unityRepository
    );

    spyOn(recipeRepository, "update").and.callFake((recipe: Recipe) => {
      if (recipe) {
        const result: Recipe = recipe;
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("updateRecipeUseCase should return message when it succeeded", async () => {
    spyOn(Utils, "isAdmin").and.returnValue(true);
    spyOn(recipeRepository, "existByName").and.returnValue(false);
    spyOn(categoryRepository, "existById").and.returnValue(true);
    spyOn(ingredientRepository, "existById").and.returnValue(true);
    spyOn(unityRepository, "existById").and.returnValue(true);
    const result: Recipe = await updateRecipeUseCase.execute(recipe, user);
    expect(result).toBeDefined();
  });

  it("updateRecipeUseCase should throw a parameter exception when the user is undefined", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValues(false);
      await updateRecipeUseCase.execute(recipe, undefined);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("updateRecipeUseCase should throw a parameter exception when the user is not admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValues(false);
      await updateRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("updateRecipeUseCase should throw a parameter exception when the name of recipe is already used", async () => {
    try {
      spyOn(recipeRepository, "existByName").and.returnValue(true);
      spyOn(ingredientRepository, "existById").and.returnValue(true);
      spyOn(unityRepository, "existById").and.returnValue(true);
      spyOn(categoryRepository, "existById").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("La recette " + recipe.name + " existe déjà.");
    }
  });

  it("updateRecipeUseCase should throw a parameter exception when the name of recipe is not defined", async () => {
    recipe.name = undefined;
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Le champ nomRecette d'une recette est obligatoire"
      );
    }
  });

  it("updateRecipeUseCase should throw a parameter exception when the libellePart of recipe is not defined", async () => {
    recipe.name_portion = undefined;
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Le champ libellePart d'une recette est obligatoire"
      );
    }
  });

  it("updateRecipeUseCase should throw a parameter exception when the nbrePart of recipe is not defined", async () => {
    recipe.number_portion = undefined;
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("Le champ nbrePart d'une recette est obligatoire");
    }
  });

  it("updateRecipeUseCase should throw a parameter exception when the tempsPreparation of recipe is not defined", async () => {
    recipe.preparation_time = undefined;
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Le champ tempsPreparation d'une recette est obligatoire"
      );
    }
  });

  it("updateRecipeUseCase should throw a parameter exception when the lenght of the name is greater than 60 caracters", async () => {
    recipe.name =
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Le champ nomRecette d'une recette ne doit pas dépasser 60 caractères"
      );
    }
  });

  it("updateRecipeUseCase should throw a parameter exception when the lenght of the libellePart is greater than 50 caracters", async () => {
    recipe.name_portion =
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    try {
      spyOn(recipeRepository, "existByName").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Le champ libellePart d'une recette ne doit pas dépasser 50 caractères"
      );
    }
  });

  it("updateRecipeUseCase should throw a parameter exception when the nbrePart is less than 0", async () => {
    recipe.number_portion = -2;
    try {
      spyOn(recipeRepository, "existByName").and.returnValue(false);
      spyOn(ingredientRepository, "existById").and.returnValue(true);
      spyOn(unityRepository, "existById").and.returnValue(true);
      spyOn(categoryRepository, "existById").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Le nombre de part doit être strictement supérieur à 0"
      );
    }
  });

  it("updateRecipeUseCase should throw a parameter exception when the nbrePart is equal to 0", async () => {
    recipe.number_portion = 0;
    try {
      spyOn(recipeRepository, "existByName").and.returnValue(false);
      spyOn(ingredientRepository, "existById").and.returnValue(true);
      spyOn(unityRepository, "existById").and.returnValue(true);
      spyOn(categoryRepository, "existById").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Le nombre de part doit être strictement supérieur à 0"
      );
    }
  });

  it("updateRecipeUseCase should throw a parameter exception when one or more ingredients have a quantity negative", async () => {
    useIngredient[0].quantity = -2;
    recipe.ingredients = useIngredient;
    try {
      spyOn(recipeRepository, "existByName").and.returnValue(false);
      spyOn(ingredientRepository, "existById").and.returnValue(true);
      spyOn(unityRepository, "existById").and.returnValue(true);
      spyOn(categoryRepository, "existById").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Les quantités au niveau des ingrédients utilisés doivent être strictement supérieurs à 0"
      );
    }
  });

  it("updateRecipeUseCase should throw a parameter exception when one or more ingredients have a quantity null", async () => {
    useIngredient[0].quantity = 0;
    recipe.ingredients = useIngredient;
    try {
      spyOn(recipeRepository, "existByName").and.returnValue(false);
      spyOn(ingredientRepository, "existById").and.returnValue(true);
      spyOn(unityRepository, "existById").and.returnValue(true);
      spyOn(categoryRepository, "existById").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Les quantités au niveau des ingrédients utilisés doivent être strictement supérieurs à 0"
      );
    }
  });

  it("updateRecipeUseCase should throw a parameter exception when useIngredients is empty", async () => {
    recipe.ingredients = [];
    try {
      spyOn(recipeRepository, "existByName").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Il faut sélectionner au moins un ingrédient pour créer une recette"
      );
    }
  });

  it("updateRecipeUseCase should throw a parameter exception when useIngredients is undefined", async () => {
    recipe.ingredients = undefined;
    try {
      spyOn(recipeRepository, "existByName").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Il faut sélectionner au moins un ingrédient pour créer une recette"
      );
    }
  });

  it("updateRecipeUseCase should throw a parameter exception when an ingredient doesn't exist", async () => {
    try {
      spyOn(recipeRepository, "existByName").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      spyOn(unityRepository, "existById").and.returnValue(true);
      spyOn(categoryRepository, "existById").and.returnValue(true);
      spyOn(ingredientRepository, "existById").and.callFake((id: any) => {
        if (id == 1) {
          return new Promise((resolve, reject) => resolve(false));
        }
        return new Promise((resolve, reject) => resolve(null));
      });
      await updateRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'ingrédient 1 n'existe pas");
    }
  });

  it("updateRecipeUseCase should throw a parameter exception when an unity doesn't exist", async () => {
    try {
      spyOn(recipeRepository, "existByName").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      spyOn(ingredientRepository, "existById").and.returnValue(true);
      spyOn(categoryRepository, "existById").and.returnValue(true);
      spyOn(unityRepository, "existById").and.callFake((id: any) => {
        if (id == 1) {
          return new Promise((resolve, reject) => resolve(false));
        }
        return new Promise((resolve, reject) => resolve(null));
      });
      await updateRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'unité 1 n'existe pas");
    }
  });

  it("updateRecipeUseCase should throw a parameter exception when classifyIn is empty", async () => {
    recipe.categories = [];
    try {
      spyOn(recipeRepository, "existByName").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      spyOn(ingredientRepository, "existById").and.returnValue(true);
      spyOn(unityRepository, "existById").and.returnValue(true);
      await updateRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Il faut sélectionner au moins une catégorie pour créer une recette"
      );
    }
  });

  it("updateRecipeUseCase should throw a parameter exception when classifyIn is undefined", async () => {
    recipe.categories = undefined;
    try {
      spyOn(recipeRepository, "existByName").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      spyOn(ingredientRepository, "existById").and.returnValue(true);
      spyOn(unityRepository, "existById").and.returnValue(true);
      await updateRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Il faut sélectionner au moins une catégorie pour créer une recette"
      );
    }
  });

  it("updateRecipeUseCase should throw a parameter exception when a category doesn't exist", async () => {
    try {
      spyOn(recipeRepository, "existByName").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      spyOn(ingredientRepository, "existById").and.returnValue(true);
      spyOn(unityRepository, "existById").and.returnValue(true);
      spyOn(categoryRepository, "existById").and.callFake((id: any) => {
        if (id == 1) {
          return new Promise((resolve, reject) => resolve(false));
        }
        return new Promise((resolve, reject) => resolve(null));
      });
      await updateRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("La catégorie 1 n'existe pas");
    }
  });

  it("updateRecipeUseCase should throw a parameter exception when images is empty", async () => {
    recipe.images = [];
    try {
      spyOn(recipeRepository, "existByName").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      spyOn(ingredientRepository, "existById").and.returnValue(true);
      spyOn(unityRepository, "existById").and.returnValue(true);
      spyOn(categoryRepository, "existById").and.returnValue(true);
      await updateRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Il faut sélectionner au moins une image pour créer une recette"
      );
    }
  });

  it("updateRecipeUseCase should throw a parameter exception when images is undefined", async () => {
    recipe.images = undefined;
    try {
      spyOn(recipeRepository, "existByName").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      spyOn(ingredientRepository, "existById").and.returnValue(true);
      spyOn(unityRepository, "existById").and.returnValue(true);
      spyOn(categoryRepository, "existById").and.returnValue(true);
      await updateRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Il faut sélectionner au moins une image pour créer une recette"
      );
    }
  });
});
