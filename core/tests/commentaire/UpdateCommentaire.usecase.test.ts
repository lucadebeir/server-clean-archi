import { TechnicalException } from "../../exceptions/TechnicalException";
import Commentaire from "../../domain/Commentaire";
import CommentaireRepository from "../../ports/repositories/Commentaire.repository";
import Recipe from "../../domain/Recipe";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import UserRepository from "../../ports/repositories/User.repository";
import * as Utils from "../../utils/token.service";
import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import UpdateCommentaireUseCase from "../../usecases/commentaire/UpdateCommentaire.usecase";

const initCommentaire = (): Commentaire => {
  const commentaire = new Commentaire();
  commentaire.idCommentaire = 1;
  commentaire.message = "C'est bon !";
  commentaire.ecritPar = "luca";
  commentaire.concerne = 1;

  return commentaire;
};

const initRecipe = (): Recipe => {
  const recipe = new Recipe();
  recipe.idRecette = 1;

  return recipe;
};

const initToken = (): TokenDomain => {
  const token = new TokenDomain();
  token.pseudo = "luca";

  return token;
};

describe("Update commentaire use case unit tests", () => {
  let updateCommentaireUseCase: UpdateCommentaireUseCase;

  let commentaire: Commentaire;
  let recipe: Recipe;
  let token: TokenDomain;

  let commentaireRepository: CommentaireRepository = ({
    update: null,
    existById: null,
  } as unknown) as CommentaireRepository;

  let recipeRepository: RecipeRepository = ({
    existById: null,
  } as unknown) as RecipeRepository;

  let userRepository: UserRepository = ({
    existByPseudo: null,
  } as unknown) as UserRepository;

  beforeEach(() => {
    commentaire = initCommentaire();
    recipe = initRecipe();
    token = initToken();

    updateCommentaireUseCase = new UpdateCommentaireUseCase(
      commentaireRepository,
      userRepository,
      recipeRepository
    );

    spyOn(commentaireRepository, "update").and.callFake((commentaire: any) => {
      if (commentaire) {
        const result: Commentaire = commentaire;
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("updateCommentaireUseCase should return commentaire when it succeeded", async () => {
    spyOn(Utils, "isLogin").and.returnValue(true);
    spyOn(userRepository, "existByPseudo").and.returnValue(true);
    spyOn(recipeRepository, "existById").and.returnValue(true);
    spyOn(commentaireRepository, "existById").and.returnValue(true);
    const result: Commentaire = await updateCommentaireUseCase.execute(
      commentaire,
      token
    );
    expect(result).toBeDefined();
    expect(result.concerne).toStrictEqual(1);
    expect(result.ecritPar).toStrictEqual("luca");
    expect(result.idCommentaire).toStrictEqual(1);
    expect(result.message).toStrictEqual("C'est bon !");
  });

  it("updateCommentaireUseCase should throw a parameter exception when the token is null", async () => {
    try {
      await updateCommentaireUseCase.execute(commentaire, undefined);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous ne pouvez pas modifier cette ressource");
    }
  });

  it("updateCommentaireUseCase should throw a parameter exception when the user is not connected", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(false);
      await updateCommentaireUseCase.execute(commentaire, token);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous ne pouvez pas modifier cette ressource");
    }
  });

  it("updateCommentaireUseCase should throw a parameter exception when the pseudo is undefined", async () => {
    commentaire.ecritPar = undefined;
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      await updateCommentaireUseCase.execute(commentaire, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'identifiant d'un utilisateur est obligatoire");
    }
  });

  it("updateCommentaireUseCase should throw a parameter exception when the user doesn't exist", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(false);
      await updateCommentaireUseCase.execute(commentaire, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'utilisateur n'existe pas");
    }
  });

  it("updateCommentaireUseCase should throw a parameter exception when the pseudo doesn't correspond to the token pseudo", async () => {
    token.pseudo = "lucas";
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(true);
      await updateCommentaireUseCase.execute(commentaire, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "La personne connectée n'est pas la personne correspondant au pseudo en question"
      );
    }
  });

  it("updateCommentaireUseCase should throw a parameter exception when the id of recipe is undefined", async () => {
    commentaire.concerne = undefined;
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(true);
      await updateCommentaireUseCase.execute(commentaire, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'identifiant d'une recette est obligatoire");
    }
  });

  it("updateCommentaireUseCase should throw a parameter exception when the recipe doesn't exist", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(true);
      spyOn(recipeRepository, "existById").and.returnValue(false);
      await updateCommentaireUseCase.execute(commentaire, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("La recette n'existe pas");
    }
  });

  it("updateCommentaireUseCase should throw a parameter exception when the identifiant is undefined", async () => {
    commentaire.idCommentaire = undefined;
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(true);
      spyOn(recipeRepository, "existById").and.returnValue(true);
      await updateCommentaireUseCase.execute(commentaire, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'identifiant est obligatoire");
    }
  });

  it("updateCommentaireUseCase should throw a parameter exception when the commentaire doesn't exist", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(true);
      spyOn(recipeRepository, "existById").and.returnValue(true);
      spyOn(commentaireRepository, "existById").and.returnValue(false);
      await updateCommentaireUseCase.execute(commentaire, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("Le commentaire n'existe pas");
    }
  });

  it("updateCommentaireUseCase should throw a parameter exception when the message is undefined", async () => {
    commentaire.message = undefined;
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(true);
      spyOn(recipeRepository, "existById").and.returnValue(true);
      spyOn(commentaireRepository, "existById").and.returnValue(true);
      await updateCommentaireUseCase.execute(commentaire, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("Le message est obligatoire");
    }
  });

  it("updateCommentaireUseCase should throw a parameter exception when the commentaire parent doesn't exist if it's not null", async () => {
    commentaire.parent = 2;
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(true);
      spyOn(recipeRepository, "existById").and.returnValue(true);
      let alreadyCalled = false;
      spyOn(commentaireRepository, "existById").and.callFake(function () {
        if (alreadyCalled) return false;
        alreadyCalled = true;
        return true;
      });
      await updateCommentaireUseCase.execute(commentaire, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("Le commentaire parent n'existe pas");
    }
  });
});
