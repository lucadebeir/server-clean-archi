import { TechnicalException } from "../../exceptions/TechnicalException";
import Commentaire from "../../domain/Commentaire";
import CommentaireRepository from "../../ports/repositories/Commentaire.repository";
import Recipe from "../../domain/Recipe";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import UserRepository from "../../ports/repositories/User.repository";
import * as Utils from "../../utils/token.service";
import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import DeleteCommentaireUseCase from "../../usecases/commentaire/DeleteCommentaire.usecase";

const initCommentaire = (): Commentaire => {
  const commentaire = new Commentaire();
  commentaire.idCommentaire = 1;
  commentaire.message = "C'est bon !";
  commentaire.ecritPar = "luca";
  commentaire.concerne = 1;

  return commentaire;
};

const initToken = (): TokenDomain => {
  const token = new TokenDomain();
  token.pseudo = "luca";

  return token;
};

describe("Delete commentaire use case unit tests", () => {
  let deleteCommentaireUseCase: DeleteCommentaireUseCase;

  let commentaire: Commentaire;
  let token: TokenDomain;

  let commentaireRepository: CommentaireRepository = ({
    deleteById: null,
    existById: null,
  } as unknown) as CommentaireRepository;

  let userRepository: UserRepository = ({
    existByPseudo: null,
  } as unknown) as UserRepository;

  beforeEach(() => {
    commentaire = initCommentaire();
    token = initToken();

    deleteCommentaireUseCase = new DeleteCommentaireUseCase(
      commentaireRepository,
      userRepository
    );

    spyOn(commentaireRepository, "deleteById").and.callFake((id: any) => {
      if (id) {
        const result: string = "Commentaire supprimé avec succès";
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("deleteCommentaireUseCase should return commentaire when it succeeded and when the user is an admin", async () => {
    spyOn(Utils, "isAdmin").and.returnValue(true);
    spyOn(Utils, "isLogin").and.returnValue(true);
    spyOn(userRepository, "existByPseudo").and.returnValue(true);
    spyOn(commentaireRepository, "existById").and.returnValue(true);
    const result: string = await deleteCommentaireUseCase.execute(
      commentaire,
      token
    );
    expect(result).toBeDefined();
    expect(result).toStrictEqual("Commentaire supprimé avec succès");
  });

  it("deleteCommentaireUseCase should return commentaire when it succeeded and when the user is an admin and the commentaire that is not his own", async () => {
    token.pseudo = "lucas";
    spyOn(Utils, "isAdmin").and.returnValue(true);
    spyOn(Utils, "isLogin").and.returnValue(true);
    spyOn(userRepository, "existByPseudo").and.returnValue(true);
    spyOn(commentaireRepository, "existById").and.returnValue(true);
    const result: string = await deleteCommentaireUseCase.execute(
      commentaire,
      token
    );
    expect(result).toBeDefined();
    expect(result).toStrictEqual("Commentaire supprimé avec succès");
  });

  it("deleteCommentaireUseCase should return commentaire when it succeeded and when the user is an user", async () => {
    spyOn(Utils, "isAdmin").and.returnValue(false);
    spyOn(Utils, "isLogin").and.returnValue(true);
    spyOn(userRepository, "existByPseudo").and.returnValue(true);
    spyOn(commentaireRepository, "existById").and.returnValue(true);
    const result: string = await deleteCommentaireUseCase.execute(
      commentaire,
      token
    );
    expect(result).toBeDefined();
    expect(result).toStrictEqual("Commentaire supprimé avec succès");
  });

  it("deleteCommentaireUseCase should throw a parameter exception when the token is null", async () => {
    try {
      await deleteCommentaireUseCase.execute(commentaire, undefined);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous ne pouvez pas supprimer cette ressource");
    }
  });

  //USER
  it("deleteCommentaireUseCase should throw a parameter exception when the user is not connected and is not an admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      spyOn(Utils, "isLogin").and.returnValue(false);
      await deleteCommentaireUseCase.execute(commentaire, token);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous ne pouvez pas supprimer cette ressource");
    }
  });

  it("deleteCommentaireUseCase should throw a parameter exception when the user delete a commentaire that is not his own and is not an admin", async () => {
    token.pseudo = "lucas";
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(false);
      await deleteCommentaireUseCase.execute(commentaire, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Ce commentaire n'est pas un des votre. Vous ne pouvez pas supprimer cette ressource"
      );
    }
  });

  it("deleteCommentaireUseCase should throw a parameter exception when the user doesn't exist and is not an admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(false);
      await deleteCommentaireUseCase.execute(commentaire, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'utilisateur n'existe pas");
    }
  });

  it("deleteCommentaireUseCase should throw a parameter exception when the identifiant is undefined and is not an admin", async () => {
    commentaire.idCommentaire = undefined;
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(true);
      await deleteCommentaireUseCase.execute(commentaire, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'identifiant est obligatoire");
    }
  });

  it("deleteCommentaireUseCase should throw a parameter exception when the commentaire doesn't exist and is not an admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(true);
      spyOn(commentaireRepository, "existById").and.returnValue(false);
      await deleteCommentaireUseCase.execute(commentaire, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("Le commentaire n'existe pas");
    }
  });

  //ADMIN
  it("deleteCommentaireUseCase should throw a parameter exception when the user doesn't exist and is an admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(false);
      await deleteCommentaireUseCase.execute(commentaire, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'utilisateur n'existe pas");
    }
  });

  it("deleteCommentaireUseCase should throw a parameter exception when the identifiant is undefined and is an admin", async () => {
    commentaire.idCommentaire = undefined;
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(true);
      await deleteCommentaireUseCase.execute(commentaire, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'identifiant est obligatoire");
    }
  });

  it("deleteCommentaireUseCase should throw a parameter exception when the commentaire doesn't exist and is an admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(true);
      spyOn(commentaireRepository, "existById").and.returnValue(false);
      await deleteCommentaireUseCase.execute(commentaire, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("Le commentaire n'existe pas");
    }
  });
});
