import {BusinessException} from "../../exceptions/BusinessException";
import * as Utils from "../../utils/token.service";
import Token from "../../domain/Token";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import AddImageToRecipeUseCase from "../../usecases/illustrate-recipe/AddImageToRecipe.usecase";
import IllustrateRecipe from "../../domain/IllustrateRecipe";
import IllustrateRecipeRepository from "../../ports/repositories/IllustrateRecipe.repository";
import ImageRepository from "../../ports/repositories/Image.repository";

const initIllustrateRecipe = (): IllustrateRecipe => {
  const illustrateRecipe = new IllustrateRecipe();
  illustrateRecipe.id_recipe = 1;
  illustrateRecipe.id_image = 1;

  return illustrateRecipe;
};

describe("Add image to recipe use case unit tests", () => {
  let addImageToRecipeUseCase: AddImageToRecipeUseCase;

  let illustrateRecipe: IllustrateRecipe;
  let token: Token = new Token();

  let illustrateRecipeRepository: IllustrateRecipeRepository = ({
    addToRecette: null,
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

    addImageToRecipeUseCase = new AddImageToRecipeUseCase(
      illustrateRecipeRepository,
      imageRepository,
      recipeRepository
    );

    spyOn(illustrateRecipeRepository, "addToRecette").and.callFake(
      (illustrateRecipe: IllustrateRecipe) => {
        if (illustrateRecipe) {
          const result: string = "L'image a bien été ajouté à la recette";
          return new Promise((resolve, reject) => resolve(result));
        }
        return new Promise((resolve, reject) => resolve(null));
      }
    );
  });

  it("addImageToRecipeUseCase should return string when it succeeded", async () => {
    spyOn(imageRepository, "existById").and.returnValue(true);
    spyOn(recipeRepository, "existById").and.returnValue(true);
    spyOn(Utils, "isAdmin").and.returnValue(true);
    spyOn(illustrateRecipeRepository, "check").and.returnValue(false);
    const result: string = await addImageToRecipeUseCase.execute(
      illustrateRecipe,
      token
    );
    expect(result).toBeDefined();
    expect(result).toBe("L'image a bien été ajouté à la recette");
  });

  it("addImageToRecipeUseCase should throw a parameter exception when the user is null", async () => {
    try {
      await addImageToRecipeUseCase.execute(illustrateRecipe, undefined);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("addImageToRecipeUseCase should throw a parameter exception when the user is not admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      await addImageToRecipeUseCase.execute(illustrateRecipe, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("addImageToRecipeUseCase should throw a parameter exception when the idImage is undefined", async () => {
    illustrateRecipe.id_image = undefined;
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await addImageToRecipeUseCase.execute(illustrateRecipe, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'image doit exister");
    }
  });

  it("addImageToRecipeUseCase should throw a parameter exception when the idRecette is undefined", async () => {
    illustrateRecipe.id_recipe = undefined;
    try {
      spyOn(imageRepository, "existById").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await addImageToRecipeUseCase.execute(illustrateRecipe, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("La recette doit exister");
    }
  });

  it("addImageToRecipeUseCase should throw a parameter exception when the image doesn't exist", async () => {
    try {
      spyOn(imageRepository, "existById").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await addImageToRecipeUseCase.execute(illustrateRecipe, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'image doit exister");
    }
  });

  it("addImageToRecipeUseCase should throw a parameter exception when the recipe doesn't exist", async () => {
    try {
      spyOn(imageRepository, "existById").and.returnValue(true);
      spyOn(recipeRepository, "existById").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await addImageToRecipeUseCase.execute(illustrateRecipe, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("La recette doit exister");
    }
  });

  it("addImageToRecipeUseCase should throw a parameter exception when image already exist on this recipe", async () => {
    try {
      spyOn(imageRepository, "existById").and.returnValue(true);
      spyOn(recipeRepository, "existById").and.returnValue(true);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      spyOn(illustrateRecipeRepository, "check").and.returnValue(true);
      await addImageToRecipeUseCase.execute(illustrateRecipe, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("Cette image existe déjà dans cette recette");
    }
  });
});
