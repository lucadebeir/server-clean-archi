import Recipe from "../../domain/Recipe";
import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import * as Utils from "../../utils/token.service";
import date from 'date-and-time';
import UseIngredient from "../../domain/UseIngredient";
import ImageDomain from "../../domain/Image.domain";
import ClassifyIn from "../../domain/ClassifyIn";
import CreateRecipeUseCase from "../../usecases/recipe/CreateRecipe.usecase";
import CategoryRepository from "../../ports/repositories/Category.repository";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";
import ImageRepository from "../../ports/repositories/Image.repository";
import UnityRepository from "../../ports/repositories/Unity.repository";

const initRecipe = (): Recipe => {
  const recipe = new Recipe();
  recipe.nomRecette = "Lasagnes";
  recipe.etapes = "1. Préchauffer le four à 180°C."
  recipe.nbrePart = 1;
  recipe.libellePart = "Bocal";
  recipe.tempsPreparation = date.format(new Date("00:08:00"), 'hh:mm:ss');
  recipe.tempsCuisson = date.format(new Date("00:08:00"), 'hh:mm:ss');
  recipe.astuce = "* Vous pouvez remplacer le beurre de cacahuètes par une autre purée d'oléagineux (amandes, cajou, noisettes..).";
  recipe.mot = "Un granola qui conviendra parfaitement aux fan de BANANA bread !";
  
  return recipe;
};

const initClassifyIn = (): ClassifyIn[] => {
  const category = new ClassifyIn();
  category.idCategorie = 1;

  const list: ClassifyIn[] = [category];

  return list;
}

const initUseIngredient = (): UseIngredient[] => {
  const useIngredient = new UseIngredient();
  useIngredient.idIngredient = 1;
  useIngredient.idUnite = 1;
  useIngredient.qte = 1;

  const list: UseIngredient[] = [useIngredient];

  return list;
}

const initImage = (): ImageDomain[] => {
  const image = new ImageDomain();
  image.lienImage = "https://storage.googleapis.com/recipes-of-marine/IMG_20200903_103750_461311495694712.jpg";
  image.nameImage = "IMG_20200903_103750_461311495694712.jpg";

  const list: ImageDomain[] = [image];

  return list;
}

describe("Create recipe use case unit tests", () => {
  let createRecipeUseCase: CreateRecipeUseCase;

  let recipe: Recipe;
  let classifyIn: ClassifyIn[];
  let useIngredient: UseIngredient[];
  let image: ImageDomain[];
  let user: TokenDomain = new TokenDomain();

  let recipeRepository: RecipeRepository = ({
    create: null,
    existByName: null
  } as unknown) as RecipeRepository;

  let categoryRepository: CategoryRepository = ({
    existById: null,
  } as unknown) as CategoryRepository;

  let ingredientRepository: IngredientRepository = ({
    existById: null,
  } as unknown) as IngredientRepository;

  let unityRepository: UnityRepository = ({
    existById: null,
  } as unknown) as UnityRepository;

  beforeEach(() => {
    recipe = initRecipe();
    classifyIn = initClassifyIn();
    useIngredient = initUseIngredient();
    image = initImage();

    recipe.classerDans = classifyIn;
    recipe.utiliserIngredients = useIngredient;
    recipe.images = image;

    createRecipeUseCase = new CreateRecipeUseCase(recipeRepository, categoryRepository, ingredientRepository, unityRepository);

    spyOn(recipeRepository, "create").and.callFake((recipe: Recipe) => {
      if (recipe) {
        const result: Recipe = { ...recipe, idRecette: 1 };
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("createRecipeUseCase should return message when it succeeded", async () => {
    spyOn(Utils, "isAdmin").and.returnValue(true);
    spyOn(recipeRepository, "existByName").and.returnValue(false);
    spyOn(categoryRepository, "existById").and.returnValue(true);
    spyOn(ingredientRepository, "existById").and.returnValue(true);
    spyOn(unityRepository, "existById").and.returnValue(true);
    const result: Recipe = await createRecipeUseCase.execute(
      recipe,
      user
    );
    expect(result).toBeDefined();
  });

  it("createRecipeUseCase should throw a parameter exception when the user is undefined", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValues(false);
      await createRecipeUseCase.execute(recipe, undefined);
    } catch (e) {
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
    } catch (e) {
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
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Un objet de type Recette est requis pour créer une recette");
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
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "La recette " + recipe.nomRecette + " existe déjà."
      );
    }
  });

  it("createRecipeUseCase should throw a parameter exception when the name of recipe is not defined", async () => {
    recipe.nomRecette = undefined;
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await createRecipeUseCase.execute(recipe, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Le champ nomRecette d'une recette est obligatoire"
      );
    }
  });

  it("createRecipeUseCase should throw a parameter exception when the libellePart of recipe is not defined", async () => {
    recipe.libellePart = undefined;
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await createRecipeUseCase.execute(recipe, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Le champ libellePart d'une recette est obligatoire"
      );
    }
  });

  it("createRecipeUseCase should throw a parameter exception when the nbrePart of recipe is not defined", async () => {
    recipe.nbrePart = undefined;
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await createRecipeUseCase.execute(recipe, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Le champ nbrePart d'une recette est obligatoire"
      );
    }
  });

  it("createRecipeUseCase should throw a parameter exception when the tempsPreparation of recipe is not defined", async () => {
    recipe.tempsPreparation = undefined;
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await createRecipeUseCase.execute(recipe, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Le champ tempsPreparation d'une recette est obligatoire"
      );
    }
  });

  it("createRecipeUseCase should throw a parameter exception when the lenght of the name is greater than 60 caracters", async () => {
    recipe.nomRecette = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await createRecipeUseCase.execute(recipe, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Le champ nomRecette d'une recette ne doit pas dépasser 60 caractères"
      );
    }
  });

  it("createRecipeUseCase should throw a parameter exception when the lenght of the libellePart is greater than 50 caracters", async () => {
    recipe.libellePart = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    try {
      spyOn(recipeRepository, "existByName").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await createRecipeUseCase.execute(recipe, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Le champ libellePart d'une recette ne doit pas dépasser 50 caractères"
      );
    }
  });

  it("createRecipeUseCase should throw a parameter exception when the nbrePart is less than 0", async () => {
    recipe.nbrePart = -2;
    try {
      spyOn(recipeRepository, "existByName").and.returnValue(false);
      spyOn(ingredientRepository, "existById").and.returnValue(true);
      spyOn(unityRepository, "existById").and.returnValue(true);
      spyOn(categoryRepository, "existById").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await createRecipeUseCase.execute(recipe, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Le nombre de part doit être strictement supérieur à 0"
      );
    }
  });

  it("createRecipeUseCase should throw a parameter exception when the nbrePart is equal to 0", async () => {
    recipe.nbrePart = 0;
    try {
      spyOn(recipeRepository, "existByName").and.returnValue(false);
      spyOn(ingredientRepository, "existById").and.returnValue(true);
      spyOn(unityRepository, "existById").and.returnValue(true);
      spyOn(categoryRepository, "existById").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await createRecipeUseCase.execute(recipe, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Le nombre de part doit être strictement supérieur à 0"
      );
    }
  });

  it("createRecipeUseCase should throw a parameter exception when one or more ingredients have a quantity negative", async () => {
    useIngredient[0].qte = -2;
    recipe.utiliserIngredients = useIngredient;
    try {
      spyOn(recipeRepository, "existByName").and.returnValue(false);
      spyOn(ingredientRepository, "existById").and.returnValue(true);
      spyOn(unityRepository, "existById").and.returnValue(true);
      spyOn(categoryRepository, "existById").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await createRecipeUseCase.execute(recipe, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Les quantités au niveau des ingrédients utilisés doivent être strictement supérieurs à 0"
      );
    }
  });

  it("createRecipeUseCase should throw a parameter exception when one or more ingredients have a quantity null", async () => {
    useIngredient[0].qte = 0;
    recipe.utiliserIngredients = useIngredient;
    try {
      spyOn(recipeRepository, "existByName").and.returnValue(false);
      spyOn(ingredientRepository, "existById").and.returnValue(true);
      spyOn(unityRepository, "existById").and.returnValue(true);
      spyOn(categoryRepository, "existById").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await createRecipeUseCase.execute(recipe, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Les quantités au niveau des ingrédients utilisés doivent être strictement supérieurs à 0"
      );
    }
  });

  it("createRecipeUseCase should throw a parameter exception when useIngredients is empty", async () => {
    recipe.utiliserIngredients = [];
    try {
      spyOn(recipeRepository, "existByName").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await createRecipeUseCase.execute(recipe, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Il faut sélectionner au moins un ingrédient pour créer une recette"
      );
    }
  });

  it("createRecipeUseCase should throw a parameter exception when useIngredients is undefined", async () => {
    recipe.utiliserIngredients = undefined;
    try {
      spyOn(recipeRepository, "existByName").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await createRecipeUseCase.execute(recipe, user);
    } catch (e) {
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
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "L'ingrédient 1 n'existe pas"
      );
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
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "L'unité 1 n'existe pas"
      );
    }
  });

  it("createRecipeUseCase should throw a parameter exception when classifyIn is empty", async () => {
    recipe.classerDans = [];
    try {
      spyOn(recipeRepository, "existByName").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      spyOn(ingredientRepository, "existById").and.returnValue(true);
      spyOn(unityRepository, "existById").and.returnValue(true);
      await createRecipeUseCase.execute(recipe, user);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Il faut sélectionner au moins une catégorie pour créer une recette"
      );
    }
  });

  it("createRecipeUseCase should throw a parameter exception when classifyIn is undefined", async () => {
    recipe.classerDans = undefined;
    try {
      spyOn(recipeRepository, "existByName").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      spyOn(ingredientRepository, "existById").and.returnValue(true);
      spyOn(unityRepository, "existById").and.returnValue(true);
      await createRecipeUseCase.execute(recipe, user);
    } catch (e) {
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
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "La catégorie 1 n'existe pas"
      );
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
    } catch (e) {
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
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Il faut sélectionner au moins une image pour créer une recette"
      );
    }
  });
});
