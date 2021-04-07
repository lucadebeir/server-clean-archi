import { BusinessException } from "../../exceptions/BusinessException";
import User from "../../domain/User";
import UserRepository from "../../ports/repositories/User.repository";
import TokenDomain from "../../domain/Token.domain";
import * as Utils from "../../utils/token.service";
import { TechnicalException } from "../../exceptions/TechnicalException";
import UpdatePasswordWithTokenUseCase from "../../usecases/user/UpdatePasswordWithToken.usecase";

const initUser = (): User => {
  const user = new User();
  user.pseudo = "luca";
  user.mdp = "muca";

  return user;
};

const initToken = (): TokenDomain => {
  const token = new TokenDomain();
  token.pseudo = "luca";
  token.exp = 1617829246;

  return token;
};

describe("Update password with token use case unit tests", () => {
  let updatePasswordWithTokenUseCase: UpdatePasswordWithTokenUseCase;

  let user: User;
  let token: TokenDomain;

  let userRepository: UserRepository = ({
    updatePasswordWithToken: null,
  } as unknown) as UserRepository;

  beforeEach(() => {
    user = initUser();
    token = initToken();
    updatePasswordWithTokenUseCase = new UpdatePasswordWithTokenUseCase(
      userRepository
    );

    spyOn(userRepository, "updatePasswordWithToken").and.callFake(
      (token: any, confirmNewPassword: any) => {
        if (token && confirmNewPassword) {
          const result: string =
            "L'utilisateur a bien modifié son mot de passe";
          return new Promise((resolve, reject) => resolve(result));
        }
        return new Promise((resolve, reject) => resolve(null));
      }
    );
  });

  it("updatePasswordWithTokenUseCase should return string when it succeeded", async () => {
    spyOn(Utils, "isExpired").and.returnValue(false);
    const result: string = await updatePasswordWithTokenUseCase.execute(
      token,
      user.mdp
    );
    expect(result).toBeDefined();
    expect(result).toStrictEqual(
      "L'utilisateur a bien modifié son mot de passe"
    );
  });

  it("updatePasswordWithTokenUseCase should throw a parameter exception when the password is undefined", async () => {
    try {
      spyOn(Utils, "isExpired").and.returnValue(false);
      await updatePasswordWithTokenUseCase.execute(token, undefined);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("Le mot de passe est obligatoire");
    }
  });

  it("updatePasswordWithTokenUseCase should throw a parameter exception when the token is undefined", async () => {
    try {
      await updatePasswordWithTokenUseCase.execute(undefined, user.mdp);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Le lien n'est plus valide. Il n'est valable que 5min. Veuillez recommencer le processus."
      );
    }
  });

  it("updatePasswordWithTokenUseCase should throw a parameter exception when the token is expired", async () => {
    try {
      spyOn(Utils, "isExpired").and.returnValue(true);
      await updatePasswordWithTokenUseCase.execute(token, user.mdp);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Le lien n'est plus valide. Il n'est valable que 5min. Veuillez recommencer le processus."
      );
    }
  });
});
