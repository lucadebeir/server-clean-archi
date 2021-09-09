import { TechnicalException } from "../../exceptions/TechnicalException";
import Commentaire from "../../domain/Commentaire";
import CommentaireRepository from "../../ports/repositories/Commentaire.repository";
import GetAllCommentairesByIdUserUseCase from "../../usecases/commentaire/GetAllCommentairesByIdUser.usecase";
import TokenDomain from "../../domain/Token.domain";
import UserRepository from "../../ports/repositories/User.repository";
import User from "../../domain/User";
import * as Utils from "../../utils/token.service";
import { BusinessException } from "../../exceptions/BusinessException";

const initCommentaires = (): Commentaire[] => {
  const commentaire = new Commentaire();
  commentaire.id = 1;
  commentaire.pseudo = "luca";

  const commentaire2 = new Commentaire();
  commentaire2.id = 2;
  commentaire2.pseudo = "luca";

  return [commentaire, commentaire2];
};

const initToken = (): TokenDomain => {
    const token = new TokenDomain();
    token.pseudo = "luca";
  
    return token;
};

const initUser = (): User => {
    const user = new User();
    user.pseudo = "luca";

    return user;
}

describe("Get all commentaires of an user use case unit tests", () => {
  let getAllCommentairesByIdUserUseCase: GetAllCommentairesByIdUserUseCase;

  let commentaires: Commentaire[];
  let token: TokenDomain;
  let user: User;

  let commentaireRepository: CommentaireRepository = ({
    findAllCommentairesByIdUser: null,
  } as unknown) as CommentaireRepository;

  let userRepository: UserRepository = ({
    existByPseudo: null,
  } as unknown) as UserRepository;

  beforeEach(() => {
    commentaires = initCommentaires();
    token = initToken();
    user = initUser();

    getAllCommentairesByIdUserUseCase = new GetAllCommentairesByIdUserUseCase(
        commentaireRepository,
        userRepository
    );

    spyOn(commentaireRepository, "findAllCommentairesByIdUser").and.callFake((pseudo: any) => {
        if(pseudo) {
            const result: Commentaire[] = commentaires;
            return new Promise((resolve, reject) => resolve(result));
        }
        return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("getAllCommentairesByIdUserUseCase should return commentaires when it succeeded", async () => {
    spyOn(Utils, "isLogin").and.returnValue(true);
    spyOn(userRepository, "existByPseudo").and.returnValue(true);
    const result: Commentaire[] = await getAllCommentairesByIdUserUseCase.execute(
      user.pseudo, token
    );
    expect(result).toBeDefined();
    expect(result.length).toStrictEqual(2);
    expect(result.filter((x) => x.pseudo === user.pseudo).length).toStrictEqual(result.length);
  });

  it("getAllCommentairesByIdUserUseCase should throw a parameter exception when the token is null", async () => {
    try {
      await getAllCommentairesByIdUserUseCase.execute(user.pseudo, undefined);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous n'avez pas accès à ces ressources");
    }
  });

  it("getAllCommentairesByIdUserUseCase should throw a parameter exception when the user is not connected", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(false);
      await getAllCommentairesByIdUserUseCase.execute(token);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous n'avez pas accès à ces ressources");
    }
  });

  it("getAllCommentairesByIdUserUseCase should throw a parameter exception when the pseudo is undefined", async () => {
    user.pseudo = undefined;
    try {
        spyOn(Utils, "isLogin").and.returnValue(true);
      await getAllCommentairesByIdUserUseCase.execute(user.pseudo, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'identifiant d'un utilisateur est obligatoire");
    }
  });

  it("getAllCommentairesByIdUserUseCase should throw a parameter exception when the user doesn't exist", async () => {
    try {
        spyOn(Utils, "isLogin").and.returnValue(true);
        spyOn(userRepository, "existByPseudo").and.returnValue(false);
      await getAllCommentairesByIdUserUseCase.execute(user.pseudo, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'utilisateur n'existe pas");
    }
  });

  it("getAllCommentairesByIdUserUseCase should throw a parameter exception when the pseudo doesn't correspond to the token pseudo", async () => {
    token.pseudo = "lucas";
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(true);
      await getAllCommentairesByIdUserUseCase.execute(user.pseudo, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "La personne connectée n'est pas la personne correspondant au pseudo en question"
      );
    }
  });
});
