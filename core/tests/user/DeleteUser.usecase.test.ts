import { BusinessException } from "../../exceptions/BusinessException";
import User from "../../domain/User";
import UserRepository from "../../ports/repositories/User.repository";
import TokenDomain from "../../domain/Token.domain";
import * as Utils from "../../utils/token.service";
import { TechnicalException } from "../../exceptions/TechnicalException";
import DeleteUserUseCase from "../../usecases/user/DeleteUser.usecase";

const initUser = (): User => {
  const user = new User();
  user.pseudo = "luca";
  user.password = "muca";
  user.is_subscribed = true;
  user.email = "luca.debeir@gmail.com";
  user.confirmed_email = true;
  user.is_admin = false;

  return user;
};

const initToken = (): TokenDomain => {
  const token = new TokenDomain();
  token.pseudo = "luca";

  return token;
};

describe("Delete user use case unit tests", () => {
  let deleteUserUseCase: DeleteUserUseCase;

  let user: User;
  let token: TokenDomain;

  let userRepository: UserRepository = {
    deleteById: null,
    existByPseudo: null,
  } as unknown as UserRepository;

  beforeEach(() => {
    user = initUser();
    token = initToken();
    deleteUserUseCase = new DeleteUserUseCase(userRepository);

    spyOn(userRepository, "deleteById").and.callFake((pseudo: any) => {
      if (pseudo) {
        const result: string = "Utilisateur supprimé avec succès";
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("deleteUserUseCase should return string when it succeeded", async () => {
    spyOn(Utils, "isLogin").and.returnValue(true);
    spyOn(userRepository, "existByPseudo").and.returnValue(true);
    const result: string = await deleteUserUseCase.execute(user.pseudo, token);
    expect(result).toBeDefined();
    expect(result).toStrictEqual("Utilisateur supprimé avec succès");
  });

  it("deleteUserUseCase should throw a parameter exception when the user is null", async () => {
    try {
      await deleteUserUseCase.execute(user.pseudo, undefined);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit de supprimer cette ressource"
      );
    }
  });

  it("deleteUserUseCase should throw a parameter exception when the user is not connected", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(false);
      await deleteUserUseCase.execute(user.pseudo, token);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit de supprimer cette ressource"
      );
    }
  });

  it("deleteUserUseCase should throw a parameter exception when the pseudo is undefined", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      await deleteUserUseCase.execute(undefined, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("Le pseudo est obligatoire");
    }
  });

  it("deleteUserUseCase should throw a parameter exception when the pseudo doesn't exist", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(false);
      await deleteUserUseCase.execute(user.pseudo, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'utilisateur n'existe pas");
    }
  });

  it("getUserByIdUseCase should throw a parameter exception when the pseudo doesn't correspond to the token pseudo", async () => {
    token.pseudo = "lucas";
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(true);
      await deleteUserUseCase.execute(user.pseudo, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "La personne connectée n'est pas la personne correspondant au pseudo en question"
      );
    }
  });
});
