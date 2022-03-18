import {TechnicalException} from "../../exceptions/TechnicalException";
import Commentaire from "../../domain/Commentaire";
import CommentaireRepository from "../../ports/repositories/Commentaire.repository";
import Recipe from "../../domain/Recipe";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import CreateCommentaireUseCase from "../../usecases/commentaire/CreateCommentaire.usecase";
import UserRepository from "../../ports/repositories/User.repository";
import * as Utils from "../../utils/token.service";
import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";

const initCommentaire = (): Commentaire => {
  const commentaire = new Commentaire();
  commentaire.message = "C'est bon !";
  commentaire.pseudo = "luca";
  commentaire.id_recipe = 1;

  return commentaire;
};

const initRecipe = (): Recipe => {
  const recipe = new Recipe();
  recipe.id = 1;

  return recipe;
};

const initToken = (): Token => {
  const token = new Token();
  token.pseudo = "luca";

  return token;
};

describe("Create commentaire use case unit tests", () => {
  let createCommentaireUseCase: CreateCommentaireUseCase;

  let commentaire: Commentaire;
  let recipe: Recipe;
  let token: Token;

  let commentaireRepository: CommentaireRepository = ({
    create: null,
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

    createCommentaireUseCase = new CreateCommentaireUseCase(
      commentaireRepository,
      userRepository,
      recipeRepository
    );

    spyOn(commentaireRepository, "create").and.callFake((commentaire: any) => {
      if (commentaire) {
        const result: Commentaire = { ...commentaire, id: 1 };
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("createCommentaireUseCase should return commentaire when it succeeded", async () => {
    spyOn(Utils, "isLogin").and.returnValue(true);
    spyOn(userRepository, "existByPseudo").and.returnValue(true);
    spyOn(recipeRepository, "existById").and.returnValue(true);
    spyOn(commentaireRepository, "existById").and.returnValue(true);
    const result: Commentaire = await createCommentaireUseCase.execute(
      commentaire,
      token
    );
    expect(result).toBeDefined();
    expect(result.id_recipe).toStrictEqual(1);
    expect(result.pseudo).toStrictEqual("luca");
    expect(result.id).toBeDefined();
    expect(result.message).toStrictEqual("C'est bon !");
  });

  it("createCommentaireUseCase should throw a parameter exception when the token is null", async () => {
    try {
      await createCommentaireUseCase.execute(commentaire, undefined);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous ne pouvez pas créer cette ressource");
    }
  });

  it("createCommentaireUseCase should throw a parameter exception when the user is not connected", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(false);
      await createCommentaireUseCase.execute(commentaire, token);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous ne pouvez pas créer cette ressource");
    }
  });

  it("createCommentaireUseCase should throw a parameter exception when the pseudo is undefined", async () => {
    commentaire.pseudo = undefined;
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      await createCommentaireUseCase.execute(commentaire, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'identifiant d'un utilisateur est obligatoire");
    }
  });

  it("createCommentaireUseCase should throw a parameter exception when the user doesn't exist", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(false);
      await createCommentaireUseCase.execute(commentaire, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'utilisateur n'existe pas");
    }
  });

  it("createCommentaireUseCase should throw a parameter exception when the pseudo doesn't correspond to the token pseudo", async () => {
    token.pseudo = "lucas";
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(true);
      await createCommentaireUseCase.execute(commentaire, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "La personne connectée n'est pas la personne correspondant au pseudo en question"
      );
    }
  });

  it("createCommentaireUseCase should throw a parameter exception when the id of recipe is undefined", async () => {
    commentaire.id_recipe = undefined;
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(true);
      await createCommentaireUseCase.execute(commentaire, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'identifiant d'une recette est obligatoire");
    }
  });

  it("createCommentaireUseCase should throw a parameter exception when the recipe doesn't exist", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(true);
      spyOn(recipeRepository, "existById").and.returnValue(false);
      await createCommentaireUseCase.execute(commentaire, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("La recette n'existe pas");
    }
  });

  it("createCommentaireUseCase should throw a parameter exception when the message is undefined", async () => {
    commentaire.message = undefined;
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(true);
      spyOn(recipeRepository, "existById").and.returnValue(true);
      await createCommentaireUseCase.execute(commentaire, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("Le message est obligatoire");
    }
  });

  it("createCommentaireUseCase should throw a parameter exception when the commentaire parent doesn't exist if it's not null", async () => {
    commentaire.parent = 2;
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(true);
      spyOn(recipeRepository, "existById").and.returnValue(true);
      spyOn(commentaireRepository, "existById").and.returnValue(false);
      await createCommentaireUseCase.execute(commentaire, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("Le commentaire parent n'existe pas");
    }
  });
});
