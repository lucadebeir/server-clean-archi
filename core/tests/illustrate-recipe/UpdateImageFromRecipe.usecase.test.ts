import { BusinessException } from "../../exceptions/BusinessException";
import * as Utils from "../../utils/token.service";
import TokenDomain from "../../domain/Token.domain";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import IllustrateRecipeDomain from "../../domain/IllustrateRecipe.domain";
import IllustrateRecipeRepository from "../../ports/repositories/IllustrateRecipe.repository";
import ImageRepository from "../../ports/repositories/Image.repository";
import UpdateImageFromRecipeUseCase from "../../usecases/illustrate-recipe/UpdateImageFromRecipe.usecase";

const initIllustrateRecipe = (): IllustrateRecipeDomain => {
  const illustrateRecipe = new IllustrateRecipeDomain();
  illustrateRecipe.idRecette = 1;
  illustrateRecipe.idImage = 1;

  return illustrateRecipe;
};

describe("Add image to recipe use case unit tests", () => {
  let updateImageFromRecipeUseCase: UpdateImageFromRecipeUseCase;

  let illustrateRecipe: IllustrateRecipeDomain;
  let token: TokenDomain = new TokenDomain();

  let illustrateRecipeRepository: IllustrateRecipeRepository = ({
    updateFromRecipe: null,
    check: null,
  } as unknown) as IllustrateRecipeRepository;

  let imageRepository: ImageRepository = ({
    existById: null,
  } as unknown) as ImageRepository;

  let recipeRepository: RecipeRepository = ({
    existById: null,
  } as unknown) as RecipeRepository;

  beforeEach(() => {
    illustrateRecipe = initIllustrateRecipe();

    updateImageFromRecipeUseCase = new UpdateImageFromRecipeUseCase(
      illustrateRecipeRepository,
      imageRepository,
      recipeRepository
    );

    spyOn(illustrateRecipeRepository, "updateFromRecipe").and.callFake(
      (illustrateRecipe: IllustrateRecipeDomain) => {
        if (illustrateRecipe) {
          const result: string = "L'image a bien remplacé dans la recette";
          return new Promise((resolve, reject) => resolve(result));
        }
        return new Promise((resolve, reject) => resolve(null));
      }
    );
  });

  it("updateImageFromRecipeUseCase should return string when it succeeded", async () => {
    spyOn(imageRepository, "existById").and.returnValue(true);
    spyOn(recipeRepository, "existById").and.returnValue(true);
    spyOn(Utils, "isAdmin").and.returnValue(true);
    spyOn(illustrateRecipeRepository, "check").and.returnValue(true);
    const result: string = await updateImageFromRecipeUseCase.execute(
      illustrateRecipe,
      token
    );
    expect(result).toBeDefined();
    expect(result).toBe("L'image a bien remplacé dans la recette");
  });

  it("updateImageFromRecipeUseCase should throw a parameter exception when the user is null", async () => {
    try {
      await updateImageFromRecipeUseCase.execute(illustrateRecipe, undefined);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("updateImageFromRecipeUseCase should throw a parameter exception when the user is not admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      await updateImageFromRecipeUseCase.execute(illustrateRecipe, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("updateImageFromRecipeUseCase should throw a parameter exception when the idImage is undefined", async () => {
    illustrateRecipe.idImage = undefined;
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateImageFromRecipeUseCase.execute(illustrateRecipe, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'image doit exister");
    }
  });

  it("updateImageFromRecipeUseCase should throw a parameter exception when the idRecette is undefined", async () => {
    illustrateRecipe.idRecette = undefined;
    try {
      spyOn(imageRepository, "existById").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateImageFromRecipeUseCase.execute(illustrateRecipe, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("La recette doit exister");
    }
  });

  it("updateImageFromRecipeUseCase should throw a parameter exception when the image doesn't exist", async () => {
    try {
      spyOn(imageRepository, "existById").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateImageFromRecipeUseCase.execute(illustrateRecipe, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'image doit exister");
    }
  });

  it("updateImageFromRecipeUseCase should throw a parameter exception when the recipe doesn't exist", async () => {
    try {
      spyOn(imageRepository, "existById").and.returnValue(true);
      spyOn(recipeRepository, "existById").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateImageFromRecipeUseCase.execute(illustrateRecipe, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("La recette doit exister");
    }
  });

  it("updateImageFromRecipeUseCase should throw a parameter exception when association doesn't exist", async () => {
    try {
      spyOn(imageRepository, "existById").and.returnValue(true);
      spyOn(recipeRepository, "existById").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      spyOn(illustrateRecipeRepository, "check").and.returnValue(false);
      await updateImageFromRecipeUseCase.execute(illustrateRecipe, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("Cette image n'existe pas dans cette recette");
    }
  });
});
