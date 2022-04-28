import {TechnicalException} from "../../exceptions/TechnicalException";
import Commentaire from "../../domain/Commentaire";
import FindAllCommentairesByIdRecipeUsecase from "../../usecases/commentaire/FindAllCommentairesByIdRecipe.usecase";
import CommentaireRepository from "../../ports/repositories/Commentaire.repository";
import Recipe from "../../domain/Recipe";
import RecipeRepository from "../../ports/repositories/Recipe.repository";

const initCommentaires = (): Commentaire[] => {
  const commentaire = new Commentaire();
  commentaire.id = 1;
  commentaire.id_recipe = 1;

  const commentaire2 = new Commentaire();
  commentaire2.id = 2;
  commentaire2.id_recipe = 1;

  return [commentaire, commentaire2];
};

const initRecipe = (): Recipe => {
  const recipe = new Recipe();
  recipe.id = 1;

  return recipe;
};

describe("Get all commentaires of a recipe use case unit tests", () => {
  let getAllCommentairesByIdRecipeUseCase: FindAllCommentairesByIdRecipeUsecase;

  let commentaires: Commentaire[];
  let recipe: Recipe;

  let commentaireRepository: CommentaireRepository = {
    findAllCommentairesByIdRecipe: null,
  } as unknown as CommentaireRepository;

  let recipeRepository: RecipeRepository = {
    existById: null,
  } as unknown as RecipeRepository;

  beforeEach(() => {
    commentaires = initCommentaires();
    recipe = initRecipe();

    getAllCommentairesByIdRecipeUseCase =
      new FindAllCommentairesByIdRecipeUsecase(
        commentaireRepository,
        recipeRepository
      );

    spyOn(commentaireRepository, "findAllCommentairesByIdRecipe").and.callFake(
      (id: any) => {
        if (id) {
          const result: Commentaire[] = commentaires;
          return new Promise((resolve, reject) => resolve(result));
        }
        return new Promise((resolve, reject) => resolve(null));
      }
    );
  });

  it("getAllCommentairesByIdRecipeUseCase should return commentaires when it succeeded", async () => {
    spyOn(recipeRepository, "existById").and.returnValue(true);
    const result: Commentaire[] =
      await getAllCommentairesByIdRecipeUseCase.execute(recipe.id);
    expect(result).toBeDefined();
    expect(result.length).toStrictEqual(2);
    expect(
      result.filter((x) => x.id_recipe === recipe.id).length
    ).toStrictEqual(result.length);
  });

  it("getAllCommentairesByIdRecipeUseCase should throw a parameter exception when the id of recipe is undefined", async () => {
    recipe.id = undefined;
    try {
      await getAllCommentairesByIdRecipeUseCase.execute(recipe.id);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe("L'identifiant d'une recette est obligatoire");
    }
  });

  it("getAllCommentairesByIdRecipeUseCase should throw a parameter exception when the recipe doesn't exist", async () => {
    try {
      spyOn(recipeRepository, "existById").and.returnValue(false);
      await getAllCommentairesByIdRecipeUseCase.execute(recipe.id);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe("La recette n'existe pas");
    }
  });
});
