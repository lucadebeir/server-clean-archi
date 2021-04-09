import { TechnicalException } from "../../exceptions/TechnicalException";
import Commentaire from "../../domain/Commentaire";
import CommentaireRepository from "../../ports/repositories/Commentaire.repository";
import Recipe from "../../domain/Recipe";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import GetAllChildrenCommentairesByIdRecipeUseCase from "../../usecases/commentaire/GetAllChildrenCommentairesByIdRecipe.usecase";

const initCommentaire = (): Commentaire => {
    const commentaire = new Commentaire();
    commentaire.idCommentaire = 1;
    commentaire.concerne = 1;

    return commentaire;
}

const initChildrenCommentaires = (): Commentaire[] => {
  const commentaire = new Commentaire();
  commentaire.idCommentaire = 2;
  commentaire.concerne = 1;
  commentaire.parent = 1;

  const commentaire2 = new Commentaire();
  commentaire2.idCommentaire = 3;
  commentaire2.concerne = 1;
  commentaire2.parent = 1;

  return [commentaire, commentaire2];
};

const initRecipe = (): Recipe => {
    const recipe = new Recipe();
    recipe.idRecette = 1;

    return recipe;
}

describe("Get all children commentaires of a recipe use case unit tests", () => {
  let getAllChildrenCommentairesByIdRecipeUseCase: GetAllChildrenCommentairesByIdRecipeUseCase;

  let children: Commentaire[];
  let parent: Commentaire;
  let recipe: Recipe;

  let commentaireRepository: CommentaireRepository = ({
    findAllChildrenCommentairesByIdRecette: null,
    existById: null,
  } as unknown) as CommentaireRepository;

  let recipeRepository: RecipeRepository = ({
      existById: null,
  } as unknown) as RecipeRepository;

  beforeEach(() => {
    children = initChildrenCommentaires();
    parent = initCommentaire();
    recipe = initRecipe();

    getAllChildrenCommentairesByIdRecipeUseCase = new GetAllChildrenCommentairesByIdRecipeUseCase(
        commentaireRepository,
        recipeRepository
    );

    spyOn(commentaireRepository, "findAllChildrenCommentairesByIdRecette").and.callFake((id: any, idCommentaire: any) => {
        if(id && idCommentaire) {
            const result: Commentaire[] = children;
            return new Promise((resolve, reject) => resolve(result));
        }
        return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("getAllChildrenCommentairesByIdRecipeUseCase should return commentaires when it succeeded", async () => {
    spyOn(recipeRepository, "existById").and.returnValue(true);
    spyOn(commentaireRepository, "existById").and.returnValue(true);
    const result: Commentaire[] = await getAllChildrenCommentairesByIdRecipeUseCase.execute(
      recipe.idRecette, parent.idCommentaire
    );
    expect(result).toBeDefined();
    expect(result.length).toStrictEqual(2);
    expect(result.filter((x) => x.concerne === recipe.idRecette).length).toStrictEqual(result.length);
    expect(result.filter((x) => x.parent === parent.idCommentaire).length).toStrictEqual(result.length);
  });

  it("getAllChildrenCommentairesByIdRecipeUseCase should throw a parameter exception when the id of recipe is undefined", async () => {
    recipe.idRecette = undefined;
    try {
      await getAllChildrenCommentairesByIdRecipeUseCase.execute(recipe.idRecette, parent.idCommentaire);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe("L'identifiant d'une recette est obligatoire");
    }
  });

  it("getAllChildrenCommentairesByIdRecipeUseCase should throw a parameter exception when the recipe doesn't exist", async () => {
    try {
      spyOn(recipeRepository, "existById").and.returnValue(false);
      await getAllChildrenCommentairesByIdRecipeUseCase.execute(recipe.idRecette, parent.idCommentaire);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe("La recette n'existe pas");
    }
  });

  it("getAllChildrenCommentairesByIdRecipeUseCase should throw a parameter exception when the id of commentaire is undefined", async () => {
    parent.idCommentaire = undefined;
    try {
        spyOn(recipeRepository, "existById").and.returnValue(true);
      await getAllChildrenCommentairesByIdRecipeUseCase.execute(recipe.idRecette, parent.idCommentaire);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe("L'identifiant d'un commentaire est obligatoire");
    }
  });

  it("getAllChildrenCommentairesByIdRecipeUseCase should throw a parameter exception when the commentaire doesn't exist", async () => {
    try {
      spyOn(recipeRepository, "existById").and.returnValue(true);
      spyOn(commentaireRepository, "existById").and.returnValue(false);
      await getAllChildrenCommentairesByIdRecipeUseCase.execute(recipe.idRecette, parent.idCommentaire);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe("La commentaire n'existe pas");
    }
  });
});
