import { BusinessException } from "../../exceptions/BusinessException";
import ImageDomain from "../../domain/Image.domain";
import ImageRepository from "../../ports/repositories/Image.repository";
import FindImageByRecetteUseCase from "../../usecases/image/FindImageByRecette.usecase";
import Recipe from "../../domain/Recipe";
import RecipeRepository from "../../ports/repositories/Recipe.repository";

const initImage = (): ImageDomain => {
  const image = new ImageDomain();
  image.idImage = 1;
  image.nameImage = "wraps aux épinards.jpeg";
  image.lienImage =
    "https://storage.googleapis.com/recipes-of-marine/wraps aux épinards.jpeg";

  return image;
};

const initRecipe = (): Recipe => {
  const recipe = new Recipe();
  recipe.idRecette = 1;

  return recipe;
};

describe("get image by recette use case unit tests", () => {
  let findImageByRecetteUseCase: FindImageByRecetteUseCase;

  let image: ImageDomain;
  let recipe: Recipe;

  let imageRepository: ImageRepository = ({
    findByRecette: null,
  } as unknown) as ImageRepository;

  let recipeRepository: RecipeRepository = ({
    existById: null,
  } as unknown) as RecipeRepository;

  beforeEach(() => {
    findImageByRecetteUseCase = new FindImageByRecetteUseCase(
      imageRepository,
      recipeRepository
    );

    image = initImage();
    recipe = initRecipe();

    spyOn(imageRepository, "findByRecette").and.callFake((id: any) => {
      if (id) {
        const result: ImageDomain = image;
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("findImageByRecetteUseCase should return image when id is 1", async () => {
    spyOn(recipeRepository, "existById").and.returnValue(true);
    const result: ImageDomain = await findImageByRecetteUseCase.execute(
      recipe.idRecette
    );
    expect(result.idImage).toBe(1);
    expect(result.nameImage).toBe("wraps aux épinards.jpeg");
    expect(result.lienImage).toBe(
      "https://storage.googleapis.com/recipes-of-marine/wraps aux épinards.jpeg"
    );
  });

  it("findImageByRecetteUseCase should throw an error when id is missing", async () => {
    try {
      await findImageByRecetteUseCase.execute(null);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'identifiant d'une recette est obligatoire");
    }
  });

  it("findImageByRecetteUseCase should throw an error when recipe doesn't exist", async () => {
    try {
      spyOn(recipeRepository, "existById").and.returnValue(false);
      await findImageByRecetteUseCase.execute(recipe.idRecette);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("La recette n'existe pas");
    }
  });
});
