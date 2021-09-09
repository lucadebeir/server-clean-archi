import { BusinessException } from "../../exceptions/BusinessException";
import * as Utils from "../../utils/token.service";
import TokenDomain from "../../domain/Token.domain";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import ClassifyIn from "../../domain/ClassifyIn";
import ClassifyInRepository from "../../ports/repositories/ClassifyIn.repository";
import CategoryRepository from "../../ports/repositories/Category.repository";
import DeleteCategoryFromRecipeUseCase from "../../usecases/classify-in/DeleteCategoryFromRecipe.usecase";

const initClassifyIn = (): ClassifyIn => {
  const classifyIn = new ClassifyIn();
  classifyIn.id_recipe = 1;
  classifyIn.id_category = 1;

  return classifyIn;
};

describe("Delete category from recipe use case unit tests", () => {
  let deleteCategoryFromRecipeUseCase: DeleteCategoryFromRecipeUseCase;

  let classifyIn: ClassifyIn;
  let token: TokenDomain = new TokenDomain();

  let classifyInRepository: ClassifyInRepository = ({
    deleteCategoryFromRecipe: null,
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

    deleteCategoryFromRecipeUseCase = new DeleteCategoryFromRecipeUseCase(
        classifyInRepository,
      categoryRepository,
      recipeRepository
    );

    spyOn(classifyInRepository, "deleteCategoryFromRecipe").and.callFake(
      (classifyIn: ClassifyIn) => {
        if (classifyIn) {
          const result: string = "La catégorie a bien été dissocié à la recette";
          return new Promise((resolve, reject) => resolve(result));
        }
        return new Promise((resolve, reject) => resolve(null));
      }
    );
  });

  it("deleteCategoryFromRecipeUseCase should return string when it succeeded", async () => {
    spyOn(categoryRepository, "existById").and.returnValue(true);
    spyOn(recipeRepository, "existById").and.returnValue(true);
    spyOn(Utils, "isAdmin").and.returnValue(true);
    spyOn(classifyInRepository, "check").and.returnValue(true);
    const result: string = await deleteCategoryFromRecipeUseCase.execute(
      classifyIn,
      token
    );
    expect(result).toBeDefined();
    expect(result).toBe("La catégorie a bien été dissocié à la recette");
  });

  it("deleteCategoryFromRecipeUseCase should throw a parameter exception when the user is null", async () => {
    try {
      await deleteCategoryFromRecipeUseCase.execute(classifyIn, undefined);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("deleteCategoryFromRecipeUseCase should throw a parameter exception when the user is not admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      await deleteCategoryFromRecipeUseCase.execute(classifyIn, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("deleteCategoryFromRecipeUseCase should throw a parameter exception when the idCategory is undefined", async () => {
    classifyIn.id_category = undefined;
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await deleteCategoryFromRecipeUseCase.execute(classifyIn, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("La catégorie doit exister");
    }
  });

  it("deleteCategoryFromRecipeUseCase should throw a parameter exception when the idRecette is undefined", async () => {
    classifyIn.id_recipe = undefined;
    try {
      spyOn(categoryRepository, "existById").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await deleteCategoryFromRecipeUseCase.execute(classifyIn, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("La recette doit exister");
    }
  });

  it("deleteCategoryFromRecipeUseCase should throw a parameter exception when the category doesn't exist", async () => {
    try {
      spyOn(categoryRepository, "existById").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await deleteCategoryFromRecipeUseCase.execute(classifyIn, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("La catégorie doit exister");
    }
  });

  it("deleteCategoryFromRecipeUseCase should throw a parameter exception when the recipe doesn't exist", async () => {
    try {
      spyOn(categoryRepository, "existById").and.returnValue(true);
      spyOn(recipeRepository, "existById").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await deleteCategoryFromRecipeUseCase.execute(classifyIn, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("La recette doit exister");
    }
  });

  it("deleteCategoryFromRecipeUseCase should throw a parameter exception when category already exist on this recipe", async () => {
    try {
      spyOn(categoryRepository, "existById").and.returnValue(true);
      spyOn(recipeRepository, "existById").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      spyOn(classifyInRepository, "check").and.returnValue(false);
      await deleteCategoryFromRecipeUseCase.execute(classifyIn, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'association de la recette et de la catégorie n'existe pas");
    }
  });
});
