import {BusinessException} from "../../exceptions/BusinessException";
import * as Utils from "../../utils/token.service";
import Token from "../../domain/Token";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import ClassifyIn from "../../domain/ClassifyIn";
import AddCategoryToRecipeUseCase from "../../usecases/classify-in/AddCategoryToRecipe.usecase";
import ClassifyInRepository from "../../ports/repositories/ClassifyIn.repository";
import CategoryRepository from "../../ports/repositories/Category.repository";

const initClassifyIn = (): ClassifyIn => {
  const classifyIn = new ClassifyIn();
  classifyIn.id_recipe = 1;
  classifyIn.id_category = 1;

  return classifyIn;
};

describe("Add category to recipe use case unit tests", () => {
  let addCategoryToRecipeUseCase: AddCategoryToRecipeUseCase;

  let classifyIn: ClassifyIn;
  let token: Token = new Token();

  let classifyInRepository: ClassifyInRepository = ({
    addCategoryToRecipe: null,
    check: null,
  } as unknown) as ClassifyInRepository;

  let categoryRepository: CategoryRepository = ({
    existById: null,
  } as unknown) as CategoryRepository;

  let recipeRepository: RecipeRepository = ({
    existById: null,
  } as unknown) as RecipeRepository;

  beforeEach(() => {
    classifyIn = initClassifyIn();

    addCategoryToRecipeUseCase = new AddCategoryToRecipeUseCase(
        classifyInRepository,
      categoryRepository,
      recipeRepository
    );

    spyOn(classifyInRepository, "addCategoryToRecipe").and.callFake(
      (classifyIn: ClassifyIn) => {
        if (classifyIn) {
          const result: string = "La catégorie a bien été associé à la recette";
          return new Promise((resolve, reject) => resolve(result));
        }
        return new Promise((resolve, reject) => resolve(null));
      }
    );
  });

  it("addCategoryToRecipeUseCase should return string when it succeeded", async () => {
    spyOn(categoryRepository, "existById").and.returnValue(true);
    spyOn(recipeRepository, "existById").and.returnValue(true);
    spyOn(Utils, "isAdmin").and.returnValue(true);
    spyOn(classifyInRepository, "check").and.returnValue(false);
    const result: string = await addCategoryToRecipeUseCase.execute(
      classifyIn,
      token
    );
    expect(result).toBeDefined();
    expect(result).toBe("La catégorie a bien été associé à la recette");
  });

  it("addCategoryToRecipeUseCase should throw a parameter exception when the user is null", async () => {
    try {
      await addCategoryToRecipeUseCase.execute(classifyIn, undefined);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("addCategoryToRecipeUseCase should throw a parameter exception when the user is not admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      await addCategoryToRecipeUseCase.execute(classifyIn, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("addCategoryToRecipeUseCase should throw a parameter exception when the idCategory is undefined", async () => {
    classifyIn.id_category = undefined;
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await addCategoryToRecipeUseCase.execute(classifyIn, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("La catégorie doit exister");
    }
  });

  it("addCategoryToRecipeUseCase should throw a parameter exception when the idRecette is undefined", async () => {
    classifyIn.id_recipe = undefined;
    try {
      spyOn(categoryRepository, "existById").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await addCategoryToRecipeUseCase.execute(classifyIn, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("La recette doit exister");
    }
  });

  it("addCategoryToRecipeUseCase should throw a parameter exception when the category doesn't exist", async () => {
    try {
      spyOn(categoryRepository, "existById").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await addCategoryToRecipeUseCase.execute(classifyIn, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("La catégorie doit exister");
    }
  });

  it("addCategoryToRecipeUseCase should throw a parameter exception when the recipe doesn't exist", async () => {
    try {
      spyOn(categoryRepository, "existById").and.returnValue(true);
      spyOn(recipeRepository, "existById").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await addCategoryToRecipeUseCase.execute(classifyIn, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("La recette doit exister");
    }
  });

  it("addCategoryToRecipeUseCase should throw a parameter exception when category already exist on this recipe", async () => {
    try {
      spyOn(categoryRepository, "existById").and.returnValue(true);
      spyOn(recipeRepository, "existById").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      spyOn(classifyInRepository, "check").and.returnValue(true);
      await addCategoryToRecipeUseCase.execute(classifyIn, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("Cette catégorie existe déjà dans cette recette");
    }
  });
});
