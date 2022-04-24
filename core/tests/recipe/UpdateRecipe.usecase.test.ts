import Recipe from "../../domain/Recipe";
import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import * as Utils from "../../utils/token.service";
import date from "date-and-time";
import UseIngredient from "../../domain/UseIngredient";
import Image from "../../domain/Image";
import UpdateRecipeUseCase from "../../usecases/recipe/UpdateRecipe.usecase";
import Category from "../../domain/Category";
import Ingredient from "../../domain/Ingredient";
import Unity from "../../domain/Unity";
import Step from "../../domain/Step";
import ClassifyInRepository from "../../ports/repositories/ClassifyIn.repository";
import UseIngredientRepository from "../../ports/repositories/UseIngredient.repository";
import StepRepository from "../../ports/repositories/Step.repository";
import IllustrateRecipe from "../../domain/IllustrateRecipe";
import IllustrateRecipeRepository from "../../ports/repositories/IllustrateRecipe.repository";

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

  recipe.recipes__categories = [{category}];

  recipe.recipes__ingredients__units = initUseIngredient();

  const image = new Image();
  image.id = 1;
  image.link =
      "https://storage.googleapis.com/recipes-of-marine/IMG_20200903_103750_461311495694712.jpg";
  image.name = "IMG_20200903_103750_461311495694712.jpg";

  const illustrateRecipe = new IllustrateRecipe();
  illustrateRecipe.image = image;
  recipe.recipes__images = [illustrateRecipe];

  return recipe;
};

const initSteps = (): Step[] => {
  const step = new Step();
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
  let user: Token = new Token();

  let recipeRepository: RecipeRepository = {
    update: null,
    existByName: null,
  } as unknown as RecipeRepository;

  let classifyInRepository: ClassifyInRepository = {
    check: null,
    addCategoryToRecipe: null
  } as unknown as ClassifyInRepository;

  let useIngredientRepository: UseIngredientRepository = {
    check: null,
    update: null,
    addIngredientToRecipe: null
  } as unknown as UseIngredientRepository;

  let stepRepository: StepRepository = {
    check: null,
    update: null,
    addStepToRecipe: null
  } as unknown as StepRepository;

  let illustrateRecipeRepository: IllustrateRecipeRepository = {
    check: null,
    addToRecette: null,
    updateFromRecipe: null
  } as unknown as IllustrateRecipeRepository;

  beforeEach(() => {
    recipe = initRecipe();
    useIngredient = initUseIngredient();

    updateRecipeUseCase = new UpdateRecipeUseCase(recipeRepository, classifyInRepository, useIngredientRepository, stepRepository, illustrateRecipeRepository);

    spyOn(classifyInRepository, "check").and.returnValue(true);
    spyOn(useIngredientRepository, "check").and.returnValue(true);
    spyOn(stepRepository, "check").and.returnValue(true);
    spyOn(useIngredientRepository, "update");
    spyOn(stepRepository, "update");
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
    const result: Recipe = await updateRecipeUseCase.execute(recipe, user);
    expect(result).toBeDefined();
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

  it("updateRecipeUseCase should throw a parameter exception when the name of recipe is not defined", async () => {
    recipe.name = undefined;
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Le champ name d'une recette est obligatoire"
      );
    }
  });

  it("updateRecipeUseCase should throw a parameter exception when the name_portion of recipe is not defined", async () => {
    recipe.name_portion = undefined;
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Le champ name_portion d'une recette est obligatoire"
      );
    }
  });

  it("updateRecipeUseCase should throw a parameter exception when the number_portion of recipe is not defined", async () => {
    recipe.number_portion = undefined;
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("Le champ number_portion d'une recette est obligatoire");
    }
  });

  it("updateRecipeUseCase should throw a parameter exception when the preparation_time of recipe is not defined", async () => {
    recipe.preparation_time = undefined;
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Le champ preparation_time d'une recette est obligatoire"
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
        "Le champ name d'une recette ne doit pas dépasser 60 caractères"
      );
    }
  });

  it("updateRecipeUseCase should throw a parameter exception when the lenght of the name_portion is greater than 50 caracters", async () => {
    recipe.name_portion =
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Le champ name_portion d'une recette ne doit pas dépasser 50 caractères"
      );
    }
  });

  it("updateRecipeUseCase should throw a parameter exception when the number_portion is less than 0", async () => {
    recipe.number_portion = -2;
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Le nombre de part doit être strictement supérieur à 0"
      );
    }
  });

  it("updateRecipeUseCase should throw a parameter exception when the number_portion is equal to 0", async () => {
    recipe.number_portion = 0;
    try {
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
    recipe.recipes__ingredients__units = useIngredient;
    try {
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
    recipe.recipes__ingredients__units = useIngredient;
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Les quantités au niveau des ingrédients utilisés doivent être strictement supérieurs à 0"
      );
    }
  });

  it("updateRecipeUseCase should throw a parameter exception when recipes__ingredients__units is empty", async () => {
    recipe.recipes__ingredients__units = [];
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Il faut sélectionner au moins un ingrédient pour créer une recette"
      );
    }
  });

  it("updateRecipeUseCase should throw a parameter exception when recipes__ingredients__units is undefined", async () => {
    recipe.recipes__ingredients__units = undefined;
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Il faut sélectionner au moins un ingrédient pour créer une recette"
      );
    }
  });

  it("updateRecipeUseCase should throw a parameter exception when recipes__categories is empty", async () => {
    recipe.recipes__categories = [];
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Il faut sélectionner au moins une catégorie pour créer une recette"
      );
    }
  });

  it("updateRecipeUseCase should throw a parameter exception when recipes__categories is undefined", async () => {
    recipe.recipes__categories = undefined;
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Il faut sélectionner au moins une catégorie pour créer une recette"
      );
    }
  });

  it("updateRecipeUseCase should throw a parameter exception when images is empty", async () => {
    recipe.recipes__images = [];
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Il faut sélectionner au moins une image pour créer une recette"
      );
    }
  });

  it("updateRecipeUseCase should throw a parameter exception when images is undefined", async () => {
    recipe.recipes__images = undefined;
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Il faut sélectionner au moins une image pour créer une recette"
      );
    }
  });
});
