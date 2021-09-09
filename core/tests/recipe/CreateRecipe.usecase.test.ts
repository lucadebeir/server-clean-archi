import Recipe from "../../domain/Recipe";
import TokenDomain from "../../domain/Token.domain";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import * as Utils from "../../utils/token.service";
import date from "date-and-time";
import UseIngredient from "../../domain/UseIngredient";
import ImageDomain from "../../domain/Image.domain";
import ClassifyIn from "../../domain/ClassifyIn";
import CreateRecipeUseCase from "../../usecases/recipe/CreateRecipe.usecase";
import CategoryRepository from "../../ports/repositories/Category.repository";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";
import UnityRepository from "../../ports/repositories/Unity.repository";
import Category from "../../domain/Category.domain";
import Ingredient from "../../domain/Ingredient";
import Unity from "../../domain/Unity";
import UserRepository from "../../ports/repositories/User.repository";
import MailingRepository from "../../ports/mailing/Mailing.repository";
import Etape from "../../domain/Etape.domain";

const initRecipe = (): Recipe => {
  const recipe = new Recipe();
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

  return recipe;
};

const initSteps = (): Etape[] => {
  const step = new Etape();
  step.indication = "Préchauffer le four à 180°C.";
  step.number = 1;
  step.id_recipe = 1;

  return [step];
};

const afterCreateRecipe = (): Recipe => {
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

  recipe.categories = initCategory();

  const useIngredient = new UseIngredient();
  useIngredient.ingredient = new Ingredient();
  useIngredient.ingredient.id = 1;
  useIngredient.ingredient.name = "Bolo";
  useIngredient.unite = new Unity();
  useIngredient.unite.id = 1;
  useIngredient.unite.name = "g";
  useIngredient.quantity = 1;

  recipe.ingredients = [useIngredient];

  const image = new ImageDomain();
  image.id = 1;
  image.link =
    "https://storage.googleapis.com/recipes-of-marine/IMG_20200903_103750_461311495694712.jpg";
  image.name = "IMG_20200903_103750_461311495694712.jpg";

  recipe.images = [image];

  return recipe;
};

const initClassifyIn = (): ClassifyIn[] => {
  const category = new ClassifyIn();
  category.id_category = 1;

  return [category];
};

const initCategory = (): Category[] => {
  const category = new Category();
  category.id = 1;
  category.name = "Douceur";

  return [category];
};

const initUseIngredient = (): UseIngredient[] => {
  const useIngredient = new UseIngredient();
  useIngredient.id_ingredient = 1;
  useIngredient.id_unit = 1;
  useIngredient.quantity = 1;

  return [useIngredient];
};

const initImage = (): ImageDomain[] => {
  const image = new ImageDomain();
  image.link =
    "https://storage.googleapis.com/recipes-of-marine/IMG_20200903_103750_461311495694712.jpg";
  image.name = "IMG_20200903_103750_461311495694712.jpg";

  return [image];
};

describe("Create recipe use case unit tests", () => {
  let createRecipeUseCase: CreateRecipeUseCase;

  let recipe: Recipe;
  let classifyIn: ClassifyIn[];
  let useIngredient: UseIngredient[];
  let image: ImageDomain[];
  let user: TokenDomain = new TokenDomain();

  let recipeRepository: RecipeRepository = {
    create: null,
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

  let userRepository: UserRepository = {
    findAllAbonneMailUsers: null
  } as unknown as UserRepository;

  let mailingRepository: MailingRepository = {
    sendMailWhenNewRecipe: null
  } as unknown as MailingRepository;

  beforeEach(() => {
    recipe = initRecipe();
    classifyIn = initClassifyIn();
    useIngredient = initUseIngredient();
    image = initImage();

    recipe.recipes__categories = classifyIn;
    recipe.ingredients = useIngredient;
    recipe.images = image;

    createRecipeUseCase = new CreateRecipeUseCase(
      recipeRepository,
      categoryRepository,
      ingredientRepository,
      unityRepository,
      mailingRepository,
      userRepository
    );

    spyOn(recipeRepository, "create").and.callFake((recipe: Recipe) => {
      if (recipe) {
        const result: Recipe = afterCreateRecipe();
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });

    spyOn(userRepository, "findAllAbonneMailUsers").and.returnValue([user]);
    spyOn(mailingRepository, "sendMailWhenNewRecipe");
  });

  it("createRecipeUseCase should return message when it succeeded", async () => {
    spyOn(Utils, "isAdmin").and.returnValue(true);
    spyOn(recipeRepository, "existByName").and.returnValue(false);
    spyOn(categoryRepository, "existById").and.returnValue(true);
    spyOn(ingredientRepository, "existById").and.returnValue(true);
    spyOn(unityRepository, "existById").and.returnValue(true);
    const result: Recipe = await createRecipeUseCase.execute(recipe, user);
    expect(result).toBeDefined();
    expect(result.id).toStrictEqual(1);
    expect(result.name).toStrictEqual("Lasagnes");
    expect(result.steps).toHaveLength(1);
    expect(result.number_portion).toStrictEqual(1);
    expect(result.number_views).toStrictEqual(0);
    expect(result.number_favorites).toStrictEqual(0);
    expect(result.date).toStrictEqual(new Date("01/04/2021"));
    expect(result.name_portion).toStrictEqual("Bocal");
    expect(result.preparation_time).toStrictEqual(
      date.format(new Date("00:08:00"), "hh:mm:ss")
    );
    expect(result.rest_time).toStrictEqual(
      date.format(new Date("00:08:00"), "hh:mm:ss")
    );
    expect(result.astuce).toStrictEqual(
      "* Vous pouvez remplacer le beurre de cacahuètes par une autre purée d'oléagineux (amandes, cajou, noisettes..)."
    );
    expect(result.mot).toStrictEqual(
      "Un granola qui conviendra parfaitement aux fan de BANANA bread !"
    );
    expect(result.categories).toBeDefined();
    expect(result.categories?.length).toStrictEqual(1);
    expect(result.ingredients).toBeDefined();
    expect(result.ingredients?.length).toStrictEqual(1);
    expect(result.images).toBeDefined();
    expect(result.images?.length).toStrictEqual(1);
    expect(result.images?.map((image) => expect(image.id).toBeDefined()));
  });

  it("createRecipeUseCase should throw a parameter exception when the user is undefined", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValues(false);
      await createRecipeUseCase.execute(recipe, undefined);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("createRecipeUseCase should throw a parameter exception when the user is not admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValues(false);
      await createRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("createRecipeUseCase should throw a parameter exception when the recipe is null", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValues(true);
      await createRecipeUseCase.execute(undefined, user);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Un objet de type Recette est requis pour créer une recette"
      );
    }
  });

  it("createRecipeUseCase should throw a parameter exception when the name of recipe is already used", async () => {
    try {
      spyOn(recipeRepository, "existByName").and.returnValue(true);
      spyOn(ingredientRepository, "existById").and.returnValue(true);
      spyOn(unityRepository, "existById").and.returnValue(true);
      spyOn(categoryRepository, "existById").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await createRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("La recette " + recipe.name + " existe déjà.");
    }
  });

  it("createRecipeUseCase should throw a parameter exception when the name of recipe is not defined", async () => {
    recipe.name = undefined;
    try {
      spyOn(recipeRepository, "existByName").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await createRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Le champ name d'une recette est obligatoire"
      );
    }
  });

  it("createRecipeUseCase should throw a parameter exception when the libellePart of recipe is not defined", async () => {
    recipe.name_portion = undefined;
    try {
      spyOn(recipeRepository, "existByName").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await createRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Le champ name_portion d'une recette est obligatoire"
      );
    }
  });

  it("createRecipeUseCase should throw a parameter exception when the nbrePart of recipe is not defined", async () => {
    recipe.number_portion = undefined;
    try {
      spyOn(recipeRepository, "existByName").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await createRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("Le champ number_portion d'une recette est obligatoire");
    }
  });

  it("createRecipeUseCase should throw a parameter exception when the tempsPreparation of recipe is not defined", async () => {
    recipe.preparation_time = undefined;
    try {
      spyOn(recipeRepository, "existByName").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await createRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Le champ preparation_time d'une recette est obligatoire"
      );
    }
  });

  it("createRecipeUseCase should throw a parameter exception when the lenght of the name is greater than 60 caracters", async () => {
    recipe.name =
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    try {
      spyOn(recipeRepository, "existByName").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await createRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Le champ name d'une recette ne doit pas dépasser 60 caractères"
      );
    }
  });

  it("createRecipeUseCase should throw a parameter exception when the lenght of the libellePart is greater than 50 caracters", async () => {
    recipe.name_portion =
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    try {
      spyOn(recipeRepository, "existByName").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await createRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Le champ name_portion d'une recette ne doit pas dépasser 50 caractères"
      );
    }
  });

  it("createRecipeUseCase should throw a parameter exception when the nbrePart is less than 0", async () => {
    recipe.number_portion = -2;
    try {
      spyOn(recipeRepository, "existByName").and.returnValue(false);
      spyOn(ingredientRepository, "existById").and.returnValue(true);
      spyOn(unityRepository, "existById").and.returnValue(true);
      spyOn(categoryRepository, "existById").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await createRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Le nombre de part doit être strictement supérieur à 0"
      );
    }
  });

  it("createRecipeUseCase should throw a parameter exception when the nbrePart is equal to 0", async () => {
    recipe.number_portion = 0;
    try {
      spyOn(recipeRepository, "existByName").and.returnValue(false);
      spyOn(ingredientRepository, "existById").and.returnValue(true);
      spyOn(unityRepository, "existById").and.returnValue(true);
      spyOn(categoryRepository, "existById").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await createRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Le nombre de part doit être strictement supérieur à 0"
      );
    }
  });

  it("createRecipeUseCase should throw a parameter exception when one or more ingredients have a quantity negative", async () => {
    useIngredient[0].quantity = -2;
    recipe.ingredients = useIngredient;
    try {
      spyOn(recipeRepository, "existByName").and.returnValue(false);
      spyOn(ingredientRepository, "existById").and.returnValue(true);
      spyOn(unityRepository, "existById").and.returnValue(true);
      spyOn(categoryRepository, "existById").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await createRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Les quantités au niveau des ingrédients utilisés doivent être strictement supérieurs à 0"
      );
    }
  });

  it("createRecipeUseCase should throw a parameter exception when one or more ingredients have a quantity null", async () => {
    useIngredient[0].quantity = 0;
    recipe.ingredients = useIngredient;
    try {
      spyOn(recipeRepository, "existByName").and.returnValue(false);
      spyOn(ingredientRepository, "existById").and.returnValue(true);
      spyOn(unityRepository, "existById").and.returnValue(true);
      spyOn(categoryRepository, "existById").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await createRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Les quantités au niveau des ingrédients utilisés doivent être strictement supérieurs à 0"
      );
    }
  });

  it("createRecipeUseCase should throw a parameter exception when useIngredients is empty", async () => {
    recipe.ingredients = [];
    try {
      spyOn(recipeRepository, "existByName").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await createRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Il faut sélectionner au moins un ingrédient pour créer une recette"
      );
    }
  });

  it("createRecipeUseCase should throw a parameter exception when useIngredients is undefined", async () => {
    recipe.ingredients = undefined;
    try {
      spyOn(recipeRepository, "existByName").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await createRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Il faut sélectionner au moins un ingrédient pour créer une recette"
      );
    }
  });

  it("createRecipeUseCase should throw a parameter exception when an ingredient doesn't exist", async () => {
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
      await createRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'ingrédient 1 n'existe pas");
    }
  });

  it("createRecipeUseCase should throw a parameter exception when an unity doesn't exist", async () => {
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
      await createRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'unité 1 n'existe pas");
    }
  });

  it("createRecipeUseCase should throw a parameter exception when classifyIn is empty", async () => {
    recipe.recipes__categories = [];
    try {
      spyOn(recipeRepository, "existByName").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      spyOn(ingredientRepository, "existById").and.returnValue(true);
      spyOn(unityRepository, "existById").and.returnValue(true);
      await createRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Il faut sélectionner au moins une catégorie pour créer une recette"
      );
    }
  });

  it("createRecipeUseCase should throw a parameter exception when classifyIn is undefined", async () => {
    recipe.recipes__categories = undefined;
    try {
      spyOn(recipeRepository, "existByName").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      spyOn(ingredientRepository, "existById").and.returnValue(true);
      spyOn(unityRepository, "existById").and.returnValue(true);
      await createRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Il faut sélectionner au moins une catégorie pour créer une recette"
      );
    }
  });

  it("createRecipeUseCase should throw a parameter exception when a category doesn't exist", async () => {
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
      await createRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("La catégorie 1 n'existe pas");
    }
  });

  it("createRecipeUseCase should throw a parameter exception when images is empty", async () => {
    recipe.images = [];
    try {
      spyOn(recipeRepository, "existByName").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      spyOn(ingredientRepository, "existById").and.returnValue(true);
      spyOn(unityRepository, "existById").and.returnValue(true);
      spyOn(categoryRepository, "existById").and.returnValue(true);
      await createRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Il faut sélectionner au moins une image pour créer une recette"
      );
    }
  });

  it("createRecipeUseCase should throw a parameter exception when images is undefined", async () => {
    recipe.images = undefined;
    try {
      spyOn(recipeRepository, "existByName").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      spyOn(ingredientRepository, "existById").and.returnValue(true);
      spyOn(unityRepository, "existById").and.returnValue(true);
      spyOn(categoryRepository, "existById").and.returnValue(true);
      await createRecipeUseCase.execute(recipe, user);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Il faut sélectionner au moins une image pour créer une recette"
      );
    }
  });
});
